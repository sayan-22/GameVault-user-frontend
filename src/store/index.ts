import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import cart from "./cartSlice";
import orders from "./ordersSlice";
import games from "./gamesSlice";

export const store = configureStore({
  reducer: { auth, cart, orders, games },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
