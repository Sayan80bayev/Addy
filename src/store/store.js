import { configureStore } from "@reduxjs/toolkit";
import { advertisementApi } from "./api/advertismentApi";
import { authenticationApi } from "./api/authenticationApi";
export const store = configureStore({
  reducer: {
    [advertisementApi.reducerPath]: advertisementApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      advertisementApi.middleware,
      authenticationApi.middleware
    ),
});
