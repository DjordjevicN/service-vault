import { IOrganization } from "@/constants/orgTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IOrganization = {
  id: 1,
  created_at: new Date().toISOString(),
  name: "Nikola Riders Club",
  admin: 1,
  email: "nikola@example.com",
  description: "A motorcycle club for adventurous riders.",
  image: "https://example.com/images/club.jpg",
  country: "Serbia",
  city: "Belgrade",
  gpsLocation: {
    lat: 44.7866,
    lng: 20.4489,
  },
  members: [
    {
      userName: "Nikola",
      userId: 11,
      status: 1,
    },
    {
      userName: "Milos",
      userId: 12,
      status: 0,
    },
  ],
  followers: [21, 34, 55],
  myMeets: [101, 102],
  myTrips: [201, 202],
};
const orgFormSlice = createSlice({
  name: "meetForm",
  initialState,
  reducers: {
    resetMeetForm: () => initialState,
  },
});

export const { resetMeetForm } = orgFormSlice.actions;

export default orgFormSlice.reducer;
