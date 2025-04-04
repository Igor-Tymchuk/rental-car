import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "favorite",
  initialState: {
    liked: [],
  },
  reducers: {
    changeFavorite: (state, { payload }) => {
      if (state.liked.includes(payload))
        return state.liked.filter((item) => item !== payload);
      state.liked.push(payload);
    },
  },
});

export const { changeFavorite } = slice.actions;
export default slice.reducer;
