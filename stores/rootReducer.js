import { combineReducers } from "redux";
import tabReducer from "./tab/tabReducer";
//the reducer used to change the selected tab for the main page
export default combineReducers({ tabReducer });
