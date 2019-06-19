import { combineReducers } from "redux";
import markers from "./markersReducer.js";

export default combineReducers({
  markers: markers
});
