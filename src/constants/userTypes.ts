export type USER_TYPES = {
  id: number;
  uuid: string;
  username: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  orgId?: string;
  role: "superadmin" | "admin" | "user";
  motorcycle?: string;
  followers?: number[];
  myMeets?: number[];
  attendingMeets?: number[];
  favoriteMeets?: number[];
  myTrips?: string[];
  favoriteTrips?: string[];
  attendingTrips?: string[];
  orgsIFollow?: string[];
  image?: string;
  city?: string;
  country?: string;
  bio?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  customLink?: string;
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
