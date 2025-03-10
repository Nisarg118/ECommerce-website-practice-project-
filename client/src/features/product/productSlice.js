import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response; // Fixed: No need for `response.data`
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async (filter) => {
    console.log("fetchProductsByFilters");
    const response = await fetchProductsByFilters(filter);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {}, // Removed unused reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload; // Fixed property name
      })
      .addCase(fetchAllProductsAsync.rejected, (state) => {
        state.status = "failed"; // Added error handling
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload; // Fixed property name
      });
  },
});

// Removed incorrect `increment` export

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
