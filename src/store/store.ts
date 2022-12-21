import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// import logger from "redux-logger";
// @ts-ignore
import rootReducer from "./rootReducer";
import { TodoRtkApi } from "./api/todoApi";

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: rootReducer,
  // highlight-start
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TodoRtkApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export const useAppDispatch = () => useDispatch();
// export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
setupListeners(store.dispatch);

export default store;
