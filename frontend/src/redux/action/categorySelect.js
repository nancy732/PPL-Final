export const selectCategory = e => {
  return {
    type: "SELECT_CATEGORY",
    categorySelect: e
  };
};

export const setCategoryArray = e => {
  return {
    type: "SET_CATEGORY_ARRAY",
    categoryArray: e
  };
};
