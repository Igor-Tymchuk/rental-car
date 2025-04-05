import { createSlice } from "@reduxjs/toolkit";
import { getCars, getBrands, getCarDetails } from "./operations";
import { arrayToSelectObj } from "../../utils/arrayToSelectObj";

const handlePending = (state) => {
  state.loading = true;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const initialState = {
  brands: [],
  items: [],
  page: null,
  totalPages: null,
  details: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    clearState: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, handlePending)
      .addCase(getBrands.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.brands = arrayToSelectObj(payload);
      })
      .addCase(getBrands.rejected, handleRejected)
      .addCase(getCarDetails.pending, handlePending)
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.details = action.payload;
      })
      .addCase(getCarDetails.rejected, handleRejected)
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = [...state.items, ...payload.cars];
        state.page = payload.page;
        state.totalPages = payload.totalPages;
      })
      .addCase(getCars.rejected, handleRejected);
  },
});
export const { clearState } = slice.actions;
export default slice.reducer;
