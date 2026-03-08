import { configureStore } from "@reduxjs/toolkit";
import { tariffsApi } from "@/shared/api/tariffs/tariffs-api";

function makeStore() {
  return configureStore({
    reducer: {
      [tariffsApi.reducerPath]: tariffsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(tariffsApi.middleware);
    }
  });
}

let storeInstance = null;

export function getStore() {
  if (!storeInstance) {
    storeInstance = makeStore();
  }

  return storeInstance;
}
