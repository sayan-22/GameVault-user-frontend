// Centralized backend endpoint paths. Services reference these instead of
// inlining strings, so a route change is a one-line edit here.
// `:param` routes are functions that take the value.

export const API_URLS = {
  auth: {
    signin: "/user/auth/signin",
    signup: "/user/auth/signup",
    refresh: "/user/auth/refresh",
    forgotPassword: "/user/auth/forgot-password",
    resetPassword: "/user/auth/reset-password",
    me: "/user/auth/me",
    logout: "/user/auth/logout",
  },
  games: {
    list: "/user/games",
    byId: (idOrSlug: string) => `/user/games/${encodeURIComponent(idOrSlug)}`,
  },
  cart: {
    root: "/user/cart",
    item: (gameId: string) => `/user/cart/${gameId}`,
  },
  checkout: {
    start: "/user/checkout",
    confirm: "/user/checkout/confirm",
  },
  orders: {
    list: "/user/orders",
  },
} as const;
