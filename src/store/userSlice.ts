import { USER_TYPES } from "@/constants/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: USER_TYPES | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<USER_TYPES>) => {
      return action.payload;
    },
    logoutUser: () => {
      return null;
    },
  },
});

export const { storeUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
