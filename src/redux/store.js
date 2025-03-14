import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // ✅ Fix: Use named import
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
