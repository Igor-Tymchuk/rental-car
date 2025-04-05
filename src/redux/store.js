import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice";
import filtersReducer from "./filters/slice";
import favoriteReducer from "./favorite/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "favorite",
  version: 1,
  storage,
  whitelist: ["liked"],
};

const persistedReducerFavorite = persistReducer(persistConfig, favoriteReducer);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    favorite: persistedReducerFavorite,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
export default store;
