export const user = e => {
  return {
    type: "USER",
    user: e
  };
};

export const click = e => {
  return {
    type: "CLICK",
    click: e
  };
};
