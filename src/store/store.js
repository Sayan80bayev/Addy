import { configureStore } from "@reduxjs/toolkit";
import { advertisementApi } from "./api/advertismentApi";
import { authenticationApi } from "./api/authenticationApi";
import { mainApi } from "./api/mainApi";
import { subscriptionApi } from "./api/subscriptionApi";
export const store = configureStore({
  reducer: {
    [advertisementApi.reducerPath]: advertisementApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      advertisementApi.middleware,
      authenticationApi.middleware,
      mainApi.middleware,
      subscriptionApi.middleware
    ),
});
