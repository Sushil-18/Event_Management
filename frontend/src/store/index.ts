import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: { events: eventReducer, auth: authReducer, modal: modalReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
