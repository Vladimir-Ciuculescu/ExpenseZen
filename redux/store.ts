import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./userReducer";
import onboardReducer from "./onboardReducer";
import expensesReducers from "./expensesReducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["expenses"],
};

const rootReducer = combineReducers({
  user: userReducer,
  onboard: onboardReducer,
  expenses: expensesReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
