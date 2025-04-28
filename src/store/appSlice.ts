import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = null;
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    resetAppState: () => {
      return null;
    },
  },
});

export const { setAppState, resetAppState } = appSlice.actions;
export default appSlice.reducer;
