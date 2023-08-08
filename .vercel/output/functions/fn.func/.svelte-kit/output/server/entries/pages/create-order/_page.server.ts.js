const actions = {
  createOrder: async (event) => {
    const data = await event.request.formData();
    const name = data.get("userName");
    console.log({ name });
    return {};
  }
};
export {
  actions
};
