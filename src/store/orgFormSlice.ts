import { IOrganization } from "@/constants/orgTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOrganization | null = {
  created_at: new Date().toISOString(),
  name: "",
  address: "",
  admin: null,
  email: "",
  description: "",
  image: "",
  country: "",
  city: "",
  gps: {
    latitude: 0,
    longitude: 0,
  },
  members: [],
  followers: [],
  myMeets: [],
  myTrips: [],
};

const orgFormSlice = createSlice({
  name: "orgForm",
  initialState,
  reducers: {
    updateOrgForm: (
      state,
      action: PayloadAction<{ key: keyof IOrganization; value: any }>
    ) => {
      const { key, value } = action.payload;
      (state[key] as any) = value;
    },

    resetOrgForm: () => initialState,
    setEntireOrgForm: (_state, action: PayloadAction<IOrganization>) => {
      return action.payload;
    },
  },
});

export const { resetOrgForm, updateOrgForm, setEntireOrgForm } =
  orgFormSlice.actions;

export default orgFormSlice.reducer;
