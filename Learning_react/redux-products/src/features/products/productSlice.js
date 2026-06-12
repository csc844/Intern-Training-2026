import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* GET PRODUCTS */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await api.get("/products");
    return res.data;
  }
);

/* ADD PRODUCT */
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await api.post("/products", product);
    return res.data;
  }
);

/* DELETE PRODUCT */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

/* UPDATE PRODUCT */
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }) => {
    const res = await api.put(`/products/${id}`, updatedData);
    return res.data;
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ADD */
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      /* DELETE */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      })

      /* UPDATE */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;