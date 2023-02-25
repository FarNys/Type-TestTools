import { combineReducers } from "@reduxjs/toolkit";
import sheetSlice from "./sheetSlice";
const rootReducer = combineReducers({
  sheetSlice,
});

// export type RootState = ReturnType;

export default rootReducer;
