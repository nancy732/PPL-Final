import { SET_USER_EMAIL, CHECK_LOGGEDIN } from "../types";
const redux = require("redux");
const combinereducers = redux.combineReducers;

const emailInitialState = {
  email: ""
};

const checkLoginInitialState = {
  checkLogin: false
};

export const userEmailReducer = (state = emailInitialState, action) => {
  switch (action.type) {
    case SET_USER_EMAIL:
      return {
        ...state,
        setEmail: action.setEmail
      };

    default:
      return state;
  }
};

export const checkLoggedInReducer = (
  state = checkLoginInitialState,
  action
) => {
  switch (action.type) {
    case CHECK_LOGGEDIN:
      return {
        ...state,
        checkLogin: action.checkLogin
      };

    default:
      return state;
  }
};

export const userAuthenticationReducer = combinereducers({
  userEmailReducer: userEmailReducer,
  checkLoggedInReducer: checkLoggedInReducer
});
