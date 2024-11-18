import { accountReducer } from "../slice";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, accountReducer);

const store = configureStore({
  reducer: {
    accountReducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore these redux-persist actions
        ignoredPaths: ["register"], // Ignore the path containing non-serializable `register`
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
