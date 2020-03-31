import { SELECT_CATEGORY, SET_CATEGORY_ARRAY } from "../types";
const redux = require("redux");
const combinereducers = redux.combineReducers;

const selectCategoryInitialState = {
  categorySelect: "All"
};

const categoryArrayInitialState = {
  categoryArray: []
};

export const selectCategoryReducer = (
  state = selectCategoryInitialState,
  action
) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      console.log("state", state);
      return {
        ...state,
        categorySelect: action.categorySelect
      };

    default:
      return state;
  }
};

export const categoryArrayReducer = (
  state = categoryArrayInitialState,
  action
) => {
  switch (action.type) {
    case SET_CATEGORY_ARRAY:
      return {
        ...state,
        categoryArray: action.categoryArray
      };

    default:
      return state;
  }
};

export const categorySelectReducer = combinereducers({
  selectCategoryReducer: selectCategoryReducer,
  categoryArrayReducer: categoryArrayReducer
});
