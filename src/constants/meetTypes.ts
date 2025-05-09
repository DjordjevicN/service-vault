export type RideParticipant = {
  userId: string;
  motorcycle: string;
  name: string;
  status: "pending" | "confirmed" | "declined"; // Extend as needed
};

export type RideComment = {
  userId: string;
  comment: string;
  createdAt: number; // or Date
};

export type RideLocation = {
  latitude: number;
  longitude: number;
};

export type MeetType = {
  id: string;
  name: string;
  description: string;
  rules: string[];
  startLocation: string;
  startTime: string; // or Date
  rideType: "relaxed" | "spirited" | "mixed"; // Extend based on app logic
  participants: RideParticipant[];
  image: string;
  createdAt: number; // or Date
  updatedAt: number; // or Date
  location: RideLocation;
  address?: string;
  city: string;
  country: string;
  tags: string[];
  organizerId: string;
  starRating: number;
  comments: RideComment[];
};
