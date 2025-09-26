import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products from API
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data; // API gives array of products
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    nextPage: (state) => {
      console.log("nextCl");
      state.currentPage += 1;
    },

    previousPage: (state) => {
      console.log("prevCl");

      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },

    goToPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })

      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   const dublicateItems = [];
      //   for (let i = 0; i <= 5; i++) {
      //     dublicateItems.push(
      //       ...action.payload.map((item) => ({
      //         ...item,
      //         id: item.id + i * action.payload.length,
      //       }))
      //     );
      //   }
      //   state.items = dublicateItems;
      // })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const count = 6;
        state.items = Array.from({ length: count }).flatMap((_, i) =>
          action.payload.map((item) => ({
            ...item,
            id: item.id + i * action.payload.length,
          }))
        );
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { nextPage, previousPage, goToPage } = productSlice.actions;

export default productSlice.reducer;
