import { c as create_ssr_component, k as createEventDispatcher, a as add_attribute, v as validate_component, b as subscribe, f as escape } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { M as Map, P as PUBLIC_MAPBOX_TOKEN, c as controls } from "../../../chunks/public.js";
import { A as Add_svg } from "../../../chunks/add.svg.js";
import { A as Arrow_right_svg } from "../../../chunks/arrow-right.svg.js";
const Sender_info = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  const { GeolocateControl } = controls;
  let center = [0, 0];
  let zoom = 7;
  let { senderInfo } = $$props;
  if ($$props.senderInfo === void 0 && $$bindings.senderInfo && senderInfo !== void 0)
    $$bindings.senderInfo(senderInfo);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="grid gap-4 mt-4 mb-8"><label><div class="label" data-svelte-h="svelte-rwgk9n">Sender&#39;s Name</div> <input class="input max-w-sm" type="text" name="userName"${add_attribute("value", senderInfo.userName, 0)}></label> <label><div class="label" data-svelte-h="svelte-yzmyl9">Sender&#39;s Phone Number</div> <input class="input max-w-sm" type="text" name="phoneNumber"${add_attribute("value", senderInfo.phoneNumber, 0)}></label> <label><div class="label" data-svelte-h="svelte-3qn05e">Pick up time</div> <input${add_attribute("value", senderInfo.pickUpTime, 0)} class="input max-w-sm" type="datetime-local" name="pickUpTime"></label> <label><div class="label" data-svelte-h="svelte-1xhwmx8">Pick up location</div> <input${add_attribute("value", senderInfo.pickUpLocation, 0)} class="input max-w-sm" type="text" name="pickUpLocation"></label> <div class="bg-tableHeaderBg p-3 rounded-md"><div class="h-56 flex-1">${validate_component(Map, "Map").$$render(
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
    )}</div> <label><div class="label" data-svelte-h="svelte-1r5jj43">Map Address</div> <input${add_attribute("value", senderInfo.mapLocation, 0)} class="input max-w-sm" type="text" name="mapAddress"></label></div> <div class="flex justify-between mt-4 max-w-sm"><button class="bg-secondary flex gap-3 px-12 justify-center items-center rounded-xl h-12 text-white">${validate_component(Add_svg, "Add").$$render($$result, {}, {}, {})} Back</button> <button class="bg-[#B29603] flex gap-3 px-12 justify-center items-center rounded-xl h-12 text-white">Next ${validate_component(Arrow_right_svg, "ArrowRight").$$render($$result, {}, {}, {})}</button></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let senderInfo = {
    userName: $page.data.session?.userData.userName || "",
    phoneNumber: $page.data.session?.userData.phoneNumber || "",
    pickUpTime: null,
    pickUpLocation: $page.data.session?.customerData.physicalAddress || "",
    mapLocation: $page.data.session?.customerData.mapAddress || ""
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      console.log({ senderInfo });
    }
    $$rendered = `<div class="mx-6 mt-6 max-w-sm"><p class="font-bold mb-4" data-svelte-h="svelte-3iyvx6">Create Order</p> <div class="flex items-stretch justify-between"><button class="${escape(
      "bg-secondary",
      true
    ) + " rounded-full text-gray7 h-8 w-full flex justify-center items-center"}">1</button> <div class="border-t-4 border-dotted w-full h-0 mx-2 self-center"></div> <button class="${escape(
      "bg-tableHeaderBg",
      true
    ) + " rounded-full text-gray7 h-8 w-full flex justify-center items-center"}">2</button> <div class="border-t-4 border-dotted w-full h-0 mx-2 self-center"></div> <button class="${escape(
      "bg-tableHeaderBg",
      true
    ) + " rounded-full text-gray7 h-8 w-full flex justify-center items-center"}">3</button> <div class="border-t-4 border-dotted w-full mx-2 h-0 self-center"></div> <button class="${escape(
      "bg-tableHeaderBg",
      true
    ) + " rounded-full text-gray7 h-8 w-full flex justify-center items-center"}">4</button> <div class="border-t-4 border-dotted w-full h-0 mx-2 self-center"></div> <button class="${escape(
      "bg-tableHeaderBg",
      true
    ) + " rounded-full text-gray7 h-8 w-full flex justify-center items-center"}">5</button></div> <div class="w-full h-[1px] mt-4 bg-gray7"></div> <form method="post" action="?/createOrder">${`${validate_component(Sender_info, "SenderInfo").$$render(
      $$result,
      { senderInfo },
      {
        senderInfo: ($$value) => {
          senderInfo = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}</form></div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
