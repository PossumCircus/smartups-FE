import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice"; // Reducer for posts feature
import usersReducer from "../features/users/usersSlice";
import themeReducer from "../features/theme/themeSlice"; // Reducer for dark mode feature
import notificationsReducer from "../features/notifications/notificationsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//persist
const usersPersistConfig = {
  key: "users",
  storage,
};

const themePersistConfig = {
  key: "theme",
  storage,
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
  posts: postsReducer,
  notifications: notificationsReducer,
});

// Configure store with reducers
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Export types for easy type checking
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch; // The type of the store's dispatch function
export type RootState = ReturnType<typeof store.getState>; // The type of the store's state
export default store; // Export the store
