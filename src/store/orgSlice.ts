import { IOrganization } from "@/constants/orgTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOrganization | null = null;

const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    storeOrg: (state, action: PayloadAction<IOrganization>) => {
      return action.payload;
    },

    clearOrg: () => {
      return null;
    },
  },
});

export const { storeOrg, clearOrg } = orgSlice.actions;
export default orgSlice.reducer;
