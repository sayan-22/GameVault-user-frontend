import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Game } from "@/constants";
import * as cartApi from "@/lib/services/cart";
import { ApiError } from "@/lib/services/authAxios";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  return cartApi.getCart();
});

export const addItem = createAsyncThunk("cart/add", async (gameId: string) => {
  return cartApi.addToCart(gameId);
});

export const removeItem = createAsyncThunk(
  "cart/remove",
  async (gameId: string) => {
    return cartApi.removeFromCart(gameId);
  }
);

// Returns the Stripe Checkout URL for the caller to redirect to.
export const checkout = createAsyncThunk<string, void, { rejectValue: string }>(
  "cart/checkout",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.startCheckout();
    } catch (e) {
      return rejectWithValue(e instanceof ApiError ? e.message : "Checkout failed");
    }
  }
);

// Confirm payment after Stripe redirects back (marks the order paid server-side).
export const confirmCheckout = createAsyncThunk(
  "cart/confirm",
  async (sessionId: string) => {
    await cartApi.confirmCheckout(sessionId);
  }
);

interface CartState {
  items: Game[];
  loading: boolean; // initial cart fetch in flight
  pendingId: string | null; // a game id currently being added/removed
  fetchId: string | null; // id of the latest fetchCart (race guard)
}

const initialState: CartState = {
  items: [],
  loading: false,
  pendingId: null,
  fetchId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.pendingId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.loading = true;
        state.fetchId = action.meta.requestId; // newest fetch wins
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        // Ignore a stale fetch that started before a newer one (e.g. a fetch
        // begun before checkout cleared the cart resolving after it).
        if (action.meta.requestId === state.fetchId) {
          state.items = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addItem.pending, (state, action) => {
        state.pendingId = action.meta.arg;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = action.payload;
        state.pendingId = null;
      })
      .addCase(addItem.rejected, (state) => {
        state.pendingId = null;
      })
      .addCase(removeItem.pending, (state, action) => {
        state.pendingId = action.meta.arg;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload;
        state.pendingId = null;
      })
      .addCase(removeItem.rejected, (state) => {
        state.pendingId = null;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
