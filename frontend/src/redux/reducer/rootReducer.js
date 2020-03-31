import { createStore } from "redux";
import { categorySelectReducer } from "./categorySelect";
import { userAuthenticationReducer } from "./userAuthentication";
const redux = require("redux");

const combinereducers = redux.combineReducers;

export const rootReducer = combinereducers({
  categorySelectReducer: categorySelectReducer,
  userAuthenticationReducer: userAuthenticationReducer
});
const store = createStore(rootReducer);
