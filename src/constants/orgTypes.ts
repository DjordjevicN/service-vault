export type IMember = {
  username: string;
  userId: number;
  status: number;
};

export type IOrganization = {
  id?: number;
  created_at: string;
  address: string;
  name: string;
  admin: number | null;
  email: string;
  description: string;
  image: string;
  country: string;
  city: string;
  gps: {
    latitude: number;
    longitude: number;
  };
  members: IMember[];
  followers: number[];
  myMeets: number[];
  myTrips: number[];
  //
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  customLink?: string;
};
