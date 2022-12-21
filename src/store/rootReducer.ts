import { combineReducers } from "@reduxjs/toolkit";
import todosSlice from "./slices/todoSlice";
import postsSlice from "./slices/postsSlice";
import { TodoRtkApi } from "./api/todoApi";
const rootReducer = combineReducers({
  todosSlice,
  postsSlice,
  [TodoRtkApi.reducerPath]: TodoRtkApi.reducer,
});

// export type RootState = ReturnType;

export default rootReducer;
