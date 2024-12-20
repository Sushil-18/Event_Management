import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: { events: eventReducer, auth: authReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
