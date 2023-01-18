import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import selectItemsReducer from "../features/selectItemsSlice";
import toggleDialogReducer from "../features/toggleDialogSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectItem: selectItemsReducer,
    toggleDialog: toggleDialogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
