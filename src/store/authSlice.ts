import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeAuth: (state, action: PayloadAction) => {
      return action.payload;
    },

    removeAuth: () => {
      return null;
    },
  },
});

export const { storeAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
