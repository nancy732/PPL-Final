import { USER, CLICK } from "./types";
const redux = require("redux");
const combinereducers = redux.combineReducers;

const emailInitialState = {
  email: ""
};

const clickInitialState = {
  click: false
};

export const userReducer = (state = emailInitialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        email: action.user
      };

    default:
      return state;
  }
};

export const clickReducer = (state = clickInitialState, action) => {
  switch (action.type) {
    case CLICK:
      return {
        ...state,
        click: action.click
      };

    default:
      return state;
  }
};

export const rootReducer = combinereducers({
  user: userReducer,
  click: clickReducer
});
