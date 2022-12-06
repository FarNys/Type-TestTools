import { combineReducers } from "@reduxjs/toolkit";
import todosSlice from "./slices/todoSlice";
const rootReducer = combineReducers({
  todosSlice,
});

// export type RootState = ReturnType;

export default rootReducer;
