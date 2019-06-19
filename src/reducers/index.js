import { combineReducer } from "redux";
import markers from "./markersReducer.js/index.js";

export default combineReducer({
  markers: markers
});
