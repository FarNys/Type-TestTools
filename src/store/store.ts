import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// import logger from "redux-logger";
// @ts-ignore
import rootReducer from "./rootReducer";
const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: rootReducer,
  // highlight-start
  middleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export const useAppDispatch = () => useDispatch();
// export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
