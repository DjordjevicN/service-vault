import { MeetType } from "@/constants/meetTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MeetType | null = null;

const meetSlice = createSlice({
  name: "meet",
  initialState,
  reducers: {
    storeUserMeets: (state, action: PayloadAction<MeetType>) => {
      return action.payload;
    },

    clearUsersMeets: () => {
      return null;
    },
  },
});

export const { storeUserMeets, clearUsersMeets } = meetSlice.actions;
export default meetSlice.reducer;
