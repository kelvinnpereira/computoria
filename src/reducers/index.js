import { combineReducers } from "redux";
import dashboard from "./dashboard";
import colors from "./colors";
import config from "./config";
import leftSidebar from "./left-sidebar";
import palettes from "./palettes";
import navigation from "./navigation";
import auth from "./auth";
import page from "./page";

const rootReducer = combineReducers({
  dashboard,
  navigation,
  colors,
  config,
  leftSidebar,
  palettes,
  auth,
  page
});

export default rootReducer;
