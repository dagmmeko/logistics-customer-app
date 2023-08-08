import { c as create_ssr_component, a as add_attribute, b as subscribe, v as validate_component, h as spread, j as escape_object } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { A as Arrow_right_svg } from "../../../chunks/arrow-right.svg.js";
import { t as toast } from "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
import { s as superForm } from "../../../chunks/index3.js";
const Logo_svg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = "" } = $$props;
  let { color = "black" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `<svg${add_attribute("class", className, 0)} width="167" height="167" viewBox="0 0 167 167" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M58.3333 41.6667V125H108.333V108.333H75V41.6667H58.3333ZM83.3333 0C94.2768 0 105.113 2.15548 115.224 6.34337C125.334 10.5313 134.521 16.6696 142.259 24.4078C149.997 32.146 156.135 41.3326 160.323 51.443C164.511 61.5535 166.667 72.3898 166.667 83.3333C166.667 105.435 157.887 126.631 142.259 142.259C126.631 157.887 105.435 166.667 83.3333 166.667C72.3898 166.667 61.5535 164.511 51.443 160.323C41.3326 156.135 32.146 149.997 24.4078 142.259C8.77974 126.631 0 105.435 0 83.3333C0 61.232 8.77974 40.0358 24.4078 24.4078C40.0358 8.77974 61.232 0 83.3333 0Z"${add_attribute("fill", color, 0)}></path></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allErrors, $$unsubscribe_allErrors;
  let $page, $$unsubscribe_page;
  let $constraints, $$unsubscribe_constraints;
  let $sendEmailForm, $$unsubscribe_sendEmailForm;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let { form } = $$props;
  const { form: sendEmailForm, enhance, allErrors, constraints } = superForm(data.sendEmailForm);
  $$unsubscribe_sendEmailForm = subscribe(sendEmailForm, (value) => $sendEmailForm = value);
  $$unsubscribe_allErrors = subscribe(allErrors, (value) => $allErrors = value);
  $$unsubscribe_constraints = subscribe(constraints, (value) => $constraints = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    for (const error of $allErrors) {
      toast.push(error.messages.join(" "));
    }
  }
  {
    form?.emailSent ? toast.push("Please check your email for sign up link", { duration: 1e4 }) : null;
  }
  $$unsubscribe_allErrors();
  $$unsubscribe_page();
  $$unsubscribe_constraints();
  $$unsubscribe_sendEmailForm();
  return `<div class="grid justify-items-stretch place-content-center h-screen">${!$page.data.session ? `${validate_component(Logo_svg, "Logo").$$render(
    $$result,
    {
      class: "w-40 h-40 justify-self-center mb-12"
    },
    {},
    {}
  )} <p class="text-4xl justify-self-center mb-6" data-svelte-h="svelte-17rinzj">Admin Portal</p>  <form method="post" action="?/sendEmail"> <label><div class="label" data-svelte-h="svelte-1akw75">Email</div> <input${spread(
    [
      { class: "input" },
      { type: "email" },
      { name: "email" },
      escape_object($constraints.email)
    ],
    {}
  )}${add_attribute("value", $sendEmailForm.email, 0)}></label> <button class="bg-black flex mt-4 justify-center items-center rounded-xl h-12 w-full"><span class="text-white pr-4" data-svelte-h="svelte-xxr220">Continue</span> ${validate_component(Arrow_right_svg, "ArrowRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></form> <div class="flex mt-3 justify-center items-center" data-svelte-h="svelte-1v8gu0l"><hr class="w-32"> <p class="mx-4 text-gray7">or with</p> <hr class="w-32"></div> <button class="w-full h-12 mt-4 border-2 border-black rounded-xl justify-self-center" data-svelte-h="svelte-1lts4fo">Sign In with Google</button>` : ``}</div>`;
});
export {
  Page as default
};
