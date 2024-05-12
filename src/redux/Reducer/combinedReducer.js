import userReducer from "./userReducer";

import { combineReducers } from "redux";

// here we are creating a root reducer (combined reducer)
const rootReducer = combineReducers({ userReducer: userReducer });

export default rootReducer;
