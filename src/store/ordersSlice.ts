import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Order } from "@/constants/order";
import { getOrders } from "@/services/orders";
import { ApiError } from "@/utils/api";

export const fetchOrders = createAsyncThunk<Order[], void, { rejectValue: string }>(
  "orders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getOrders();
    } catch (e) {
      return rejectWithValue(
        e instanceof ApiError ? e.message : "Failed to load orders"
      );
    }
  }
);

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = { items: [], loading: false, error: null };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load orders";
      });
  },
});

export default ordersSlice.reducer;
