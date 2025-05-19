export type USER_TYPES = {
  id: string;
  uuid: string;
  username: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  orgId?: string;
  role: "superadmin" | "admin" | "user";
  motorcycle?: string;
  followers?: string[];
  myMeets?: string[];
  attendingMeets?: string[];
  favoriteMeets?: string[];
  myTrips?: string[];
  favoriteTrips?: string[];
  attendingTrips?: string[];
  orgsIFollow?: string[];
  image?: string;
  city?: string;
  country?: string;
  bio?: string;
};
export type NEW_USER_TYPES = {
  username?: string;
  email: string;
  password: string;
};
export type LOGIN_USER_TYPES = {
  email: string;
  password: string;
};
