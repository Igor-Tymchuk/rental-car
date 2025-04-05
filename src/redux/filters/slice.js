import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
    limit: "",
    page: "",
  },
  reducers: {
    setFilter(state, { payload }) {
      state.brand = payload?.brand;
      state.rentalPrice = payload?.rentalPrice;
      state.minMileage = payload?.minMileage;
      state.maxMileage = payload?.maxMileage;
      state.limit = payload?.limit;
      state.page = payload?.page;
    },
  },
});

export const { setFilter } = slice.actions;
export default slice.reducer;
