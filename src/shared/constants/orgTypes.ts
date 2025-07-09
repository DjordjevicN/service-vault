export type IMember = {
  userId: string | number | undefined;
  username: string;
  status: number;
  image?: string;
  orgId: string | number;
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
  members: number[];
  followers: number[];
  myMeets: number[];
  myTrips: number[];
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  customLink?: string;
};
