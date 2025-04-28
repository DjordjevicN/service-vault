export type USER_TYPES = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user" | "guest" | "moderator" | "superadmin";
  motorcycle: string;
  trips: string[];
  meets: string[];
  image: string;
};
export type NEW_USER_TYPES = {
  username: string;
  email: string;
  password: string;
};
export type LOGIN_USER_TYPES = {
  email: string;
  password: string;
};
