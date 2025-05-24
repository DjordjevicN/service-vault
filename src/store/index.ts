import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./userSlice";
import appReducer from "./appSlice";
import meetReducer from "./meetSlice";
import meetFormReducer from "./meetFormSlice";
import authReducer from "./authSlice";
import orgReducer from "./orgSlice";
import orgFormReducer from "./orgFormSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "app", "auth", "organizationForm"], // Can change to blacklist if needed
  blacklist: [], // Example: Don't persist sensitive fields
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  meets: meetReducer,
  meetForm: meetFormReducer,
  organization: orgReducer,
  organizationForm: orgFormReducer,
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Types for TypeScript
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
