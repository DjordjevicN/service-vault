export type OrgMember = {
  userId: string;
  username: string;
  rank: "president" | "vice president" | "member"; // Extend if needed
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type Organization = {
  id: string;
  email: string;
  password: string;
  name: string;
  description: string;
  rules: string[];
  image: string;
  city: string;
  country: string;
  createdAt: number; // or Date
  updatedAt: number; // or Date
  location: Location;
  members: OrgMember[];
  followers: string[];
  myMeets: string[];
  attendingMeets: string[];
  favoriteMeets: string[];
  myTrips: string[];
  favoriteTrips: string[];
  attendingTrips: string[];
  orgsIFollow: string[];
};
