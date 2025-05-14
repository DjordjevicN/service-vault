// Types
export type RideParticipant = {
  userId: string;
  motorcycle: string;
  name: string;
  status: "pending" | "confirmed" | "declined";
};

export type RideComment = {
  userId: string;
  comment: string;
  createdAt: number | null;
};

export type RideLocation = {
  latitude: number | null;
  longitude: number | null;
};

export type MeetType = {
  id: string;
  name: string;
  description: string;
  rules: string[];
  startLocation: string;
  startTime: string;
  startDate: string;
  rideType: "relaxed" | "spirited" | "mixed" | "";
  participants: RideParticipant[];
  maxRiders: number;
  image: string;
  createdAt: number | null;
  updatedAt: number | null;
  location: RideLocation;
  address: string;
  city: string;
  country: string;
  tags: string[];
  organizerId: string;
  starRating: number;
  comments: RideComment[];
};
