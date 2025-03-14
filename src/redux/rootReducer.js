import { combineReducers } from "redux";
// import homeReducer from "../screens/HomeScreen/homeReducer";
import globalReducer from "./globalReducer"; // Global API handling

const rootReducer = combineReducers({
//   home: homeReducer,
  global: globalReducer,
});

export default rootReducer;
