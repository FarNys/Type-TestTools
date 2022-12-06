import { combineReducers } from "@reduxjs/toolkit";
import todosSlice from "./slices/todoSlice";
import postsSlice from "./slices/postsSlice";
const rootReducer = combineReducers({
  todosSlice,
  postsSlice,
});

// export type RootState = ReturnType;

export default rootReducer;
