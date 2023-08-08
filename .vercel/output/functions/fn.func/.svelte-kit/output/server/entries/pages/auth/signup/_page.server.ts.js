import { e as error } from "../../../../chunks/index.js";
const load = async (event) => {
  if (!event.url.searchParams.get("token")) {
    throw error(500, "Token not found.");
  }
  const tokenURL = event.url.searchParams.get("token");
  return {
    tokenURL
  };
};
export {
  load
};
