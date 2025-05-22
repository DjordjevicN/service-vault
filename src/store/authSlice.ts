import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@supabase/supabase-js";
const initialState: AuthUser | null = null;

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
