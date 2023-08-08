import { c as create_ssr_component, b as subscribe, v as validate_component, h as spread, j as escape_object, a as add_attribute } from "../../../chunks/ssr.js";
import { P as PUBLIC_MAPBOX_TOKEN, M as Map, c as controls } from "../../../chunks/public.js";
import { I as Image_svg } from "../../../chunks/image.svg.js";
import { s as superForm } from "../../../chunks/index3.js";
import { CustomerType } from "@prisma/client";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $constraints, $$unsubscribe_constraints;
  let { data } = $$props;
  const { GeolocateControl } = controls;
  const { form, enhance, allErrors, constraints } = superForm(data.customerInformationForm);
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_constraints = subscribe(constraints, (value) => $constraints = value);
  let center = [0, 0];
  let zoom = 7;
  let [mapLat, mapLng] = $form.mapAddress?.split(",") || [];
  if (mapLat && mapLng) {
    center = [Number(mapLng.trim()), Number(mapLat.trim())];
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="p-12 grid justify-items-center">${validate_component(Image_svg, "Image").$$render($$result, { class: "mb-4 h-24 w-24" }, {}, {})} ${!data.session?.customerData.premium ? `<button class="px-6 h-10 border-[1px] border-secondary text-xs font-semibold text-secondary rounded-xl justify-self-center" data-svelte-h="svelte-5bbwxq">Upgrade to Premium</button>` : ``} <form class="grid gap-6 mt-4" method="post" action="?/updateCustomer"><label><div class="label" data-svelte-h="svelte-ti11bj">User Name</div> <input${spread(
      [
        { class: "input w-72 max-w-sm" },
        { type: "text" },
        { name: "userName" },
        escape_object($constraints.userName)
      ],
      {}
    )}${add_attribute("value", $form.userName, 0)}></label> <label><div class="label" data-svelte-h="svelte-1akw75">Email</div> <input${spread(
      [
        { class: "input max-w-sm" },
        { type: "text" },
        { name: "email" },
        escape_object($constraints.email)
      ],
      {}
    )}${add_attribute("value", $form.email, 0)}></label> <label><div class="label" data-svelte-h="svelte-4dtme0">Phone Number</div> <input${spread(
      [
        { class: "input max-w-sm" },
        { type: "text" },
        { name: "phoneNumber" },
        escape_object($constraints.phoneNumber)
      ],
      {}
    )}${add_attribute("value", $form.phoneNumber, 0)}></label> <label><div class="label" data-svelte-h="svelte-cy2nbc">Physical Address</div> <input${spread(
      [
        { class: "input max-w-sm" },
        { type: "text" },
        { name: "physicalAddress" },
        escape_object($constraints.physicalAddress)
      ],
      {}
    )}${add_attribute("value", $form.physicalAddress, 0)}></label> <label><div class="label" data-svelte-h="svelte-n8823p">Customer Type</div> <select class="input max-w-sm" name="customerType"><option selected disabled value="Not selected" data-svelte-h="svelte-1roo6hr">Not selected</option><option${add_attribute("value", CustomerType.COMMERCIAL, 0)}>Commercial </option><option${add_attribute("value", CustomerType.RESIDENTIAL, 0)}>Residential</option></select></label> <div class="h-56 flex-1">${validate_component(Map, "Map").$$render(
      $$result,
      {
        accessToken: PUBLIC_MAPBOX_TOKEN,
        center,
        zoom
      },
      {
        center: ($$value) => {
          center = $$value;
          $$settled = false;
        },
        zoom: ($$value) => {
          zoom = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(GeolocateControl, "GeolocateControl").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div> <label><div class="label" data-svelte-h="svelte-1r5jj43">Map Address</div> <input${spread(
      [
        { class: "input max-w-sm" },
        { type: "text" },
        { name: "mapAddress" },
        escape_object($constraints.mapAddress)
      ],
      {}
    )}${add_attribute("value", $form.mapAddress, 0)}></label> <button class="bg-secondary flex mt-12 justify-center items-center rounded-xl h-12 max-w-sm text-white" data-svelte-h="svelte-su0mq1">Submit</button></form></div>`;
  } while (!$$settled);
  $$unsubscribe_form();
  $$unsubscribe_constraints();
  return $$rendered;
});
export {
  Page as default
};
