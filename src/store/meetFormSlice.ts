import { MeetType } from "@/constants/meetTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
const initialState: MeetType = {
  name: "",
  description: "",
  rules: [""],
  startLocation: "",
  startTime: "",
  startDate: "",
  rideType: "",
  participants: [],
  maxRiders: 0,
  gps: {
    latitude: null,
    longitude: null,
  },
  address: "",
  city: "",
  country: "",
  organizerId: "",
  starRating: 0,
  image: "",
  price: 0,
  onSale: 0,
};

// Slice
const meetFormSlice = createSlice({
  name: "meetForm",
  initialState,
  reducers: {
    updateMeetForm: (
      state,
      action: PayloadAction<{ key: keyof MeetType; value: any }>
    ) => {
      const { key, value } = action.payload;
      (state[key] as any) = value;
    },
    resetMeetForm: () => initialState,
    setEntireMeetForm: (_state, action: PayloadAction<MeetType>) => {
      return action.payload;
    },

    // Action for adding a new rule
    addRule: (state) => {
      state.rules.push(""); // Add a new empty rule to the rules array
    },

    // Action for deleting a rule
    deleteRule: (state, action: PayloadAction<number>) => {
      state.rules = state.rules.filter((_, index) => index !== action.payload); // Remove rule by index
    },

    // Action for updating a rule
    updateRule: (
      state,
      action: PayloadAction<{ value: string; index: number }>
    ) => {
      state.rules[action.payload.index] = action.payload.value; // Update rule at a specific index
    },
  },
});

export const {
  updateMeetForm,
  resetMeetForm,
  setEntireMeetForm,
  addRule,
  deleteRule,
  updateRule,
} = meetFormSlice.actions;

export default meetFormSlice.reducer;
