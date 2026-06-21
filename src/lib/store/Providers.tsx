"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchMe } from "./authSlice";
import { fetchCart, clearCart } from "./cartSlice";

// Bootstraps global state: hydrate the user on load, then load their cart once
// auth resolves (sign in -> fetch cart, sign out -> empty it).
function Bootstrap({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.auth.user?.id);
  const authLoading = useAppSelector((s) => s.auth.loading);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (authLoading) return;
    if (userId) dispatch(fetchCart());
    else dispatch(clearCart());
  }, [authLoading, userId, dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Bootstrap>{children}</Bootstrap>
    </Provider>
  );
}
