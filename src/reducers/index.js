import { combineReducers } from "redux";
import dashboard from "./dashboard";
import colors from "./colors";
import config from "./config";
import leftSidebar from "./left-sidebar";
import palettes from "./palettes";
import navigation from "./navigation";
import navigation_coordenador from "./navigation_coordenador";
import auth from "./auth";
import page from "./page";

const rootReducer = combineReducers({
  dashboard,
  navigation,
  navigation_coordenador,
  colors,
  config,
  leftSidebar,
  palettes,
  auth,
  page
});

export default rootReducer;
