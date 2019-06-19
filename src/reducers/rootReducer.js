import { combineReducer } from "redux";
import markers from "./markersReducer.js";

export default combineReducer({
  markers: markers
});
