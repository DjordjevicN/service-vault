// Types

export type RideComment = {
  userId: string;
  comment: string;
  createdAt: number | null;
};

export type RideGps = {
  latitude: number | null;
  longitude: number | null;
};

export type MeetType = {
  id?: string | number;
  name: string;
  description: string;
  rules: string[];
  startLocation: string;
  startTime: string;
  startDate: string;
  rideType: "relaxed" | "spirited" | "mixed" | "";
  participants: string[];
  maxRiders: number;
  image: string;
  createdAt?: number | null;
  gps: RideGps;
  address: string;
  city: string;
  country: string;
  organizerId: string;
  starRating: number;
};
