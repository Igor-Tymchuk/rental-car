import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "favorite",
  initialState: {
    liked: [],
  },
  reducers: {
    changeFavorite: (state, { payload }) => {
      const index = state.liked.indexOf(payload);
      if (index !== -1) {
        state.liked.splice(index, 1);
      } else {
        state.liked.push(payload);
      }
    },
  },
});

export const { changeFavorite } = slice.actions;
export default slice.reducer;
