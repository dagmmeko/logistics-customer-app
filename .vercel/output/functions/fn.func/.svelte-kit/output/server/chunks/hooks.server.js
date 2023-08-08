import { d as dev } from "./environment.js";
import { d as private_env } from "./internal.js";
import { Auth } from "@auth/core";
import Google from "@auth/core/providers/google";
import CredentialsProvider from "@auth/core/providers/credentials";
import { G as GOOGLE_ID, a as GOOGLE_SECRET, J as JWTSECRET, A as AUTH_SECRET } from "./private.js";
import { p as prisma } from "./prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
async function getSession(req, config) {
  config.secret ??= private_env.AUTH_SECRET;
  config.trustHost ??= true;
  const url = new URL("/api/auth/session", req.url);
  const request = new Request(url, { headers: req.headers });
  const response = await Auth(request, config);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AuthHandle(svelteKitAuthOptions) {
  return async function({ event, resolve }) {
    const authOptions = typeof svelteKitAuthOptions === "object" ? svelteKitAuthOptions : await svelteKitAuthOptions(event);
    const { prefix = "/auth" } = authOptions;
    const { url, request } = event;
    event.locals.getSession ??= () => getSession(request, authOptions);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) {
      return resolve(event);
    }
    return Auth(request, authOptions);
  };
}
function SvelteKitAuth(options) {
  if (typeof options === "object") {
    options.secret ??= private_env.AUTH_SECRET;
    options.trustHost ??= !!(private_env.AUTH_TRUST_HOST ?? private_env.VERCEL ?? dev);
  }
  return AuthHandle(options);
}
const authHook = SvelteKitAuth({
  trustHost: true,
  providers: [
    Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        token: { label: "token", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials.token) {
          throw new Error("Token not found");
        }
        let decodedToken;
        try {
          decodedToken = jwt.verify(
            credentials.token,
            JWTSECRET
          );
        } catch (err) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: {
            email: decodedToken.userEmail
          }
        });
        if (!user) {
          throw new Error("User not found!");
        }
        if (!user.jwtPassword) {
          throw new Error("User password not set.");
        }
        const authorized = await bcrypt.compare(
          decodedToken.password,
          user.jwtPassword
        );
        if (!authorized) {
          throw new Error("User not Authorized");
        }
        return {
          id: user.id.toString(),
          name: user.userName,
          email: user.email
        };
      }
    })
  ],
  pages: {
    error: "/auth/signup-error"
  },
  secret: AUTH_SECRET,
  callbacks: {
    signIn: async (params) => {
      if (params.account?.provider === "google") {
        if (!params.profile) {
          throw new Error("User in provider in undefined.");
        }
        if (!params.profile.email) {
          throw new Error(
            `Email not found in your ${params.account?.provider ?? `login provider's`} account`
          );
        }
        try {
          const findUser = await prisma.user.findFirst({
            where: {
              email: params.profile.email
            }
          });
          if (!findUser) {
            await prisma.user.create({
              data: {
                email: params.profile.email,
                isEmployee: false,
                userName: params.profile.name,
                Customer: {
                  create: {}
                }
              }
            });
            return true;
          } else if (findUser && !findUser.isEmployee) {
            return true;
          }
        } catch (error) {
          console.log(error);
          throw new Error("User not found" + error);
        }
      } else if (params.account?.provider === "credentials") {
        return true;
      }
      throw new Error("Account provider not known.");
    },
    jwt: async (params) => {
      if (!params.token?.email) {
        throw new Error("Account JWT not found.");
      }
      const dbUser = await prisma.user.findFirst({
        where: {
          email: params.token.email
        }
      });
      const dbCustomerData = await prisma.customer.findFirst({
        where: {
          userId: dbUser?.id
        }
      });
      return {
        ...params.token,
        userData: dbUser,
        customerData: dbCustomerData
      };
    },
    session: async (params) => {
      return {
        ...params.session,
        userData: params.token.userData,
        customerData: params.token.customerData
      };
    }
  }
});
function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
const handle = sequence(authHook);
export {
  handle
};
