import { createStore } from "redux";
import { rootReducer } from "./ppl/reducer";
const store = createStore(rootReducer);
export default store;
