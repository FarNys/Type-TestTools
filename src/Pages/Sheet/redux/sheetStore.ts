import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// import logger from "redux-logger";
// @ts-ignore
import sheetRootReducer from "./sheetRootReducer";

const sheetStore = configureStore({
  reducer: sheetRootReducer,
  // highlight-start
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof sheetStore.dispatch;
export type RootState = ReturnType<typeof sheetStore.getState>;

// export const useAppDispatch = () => useDispatch();
// export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
// setupListeners(sheetStore.dispatch);

export default sheetStore;
