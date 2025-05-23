export type IOrganization = {
  id: number;
  created_at: string;
  name: string;
  admin: number;
  email: string;
  description: string;
  image: string;
  country: string;
  city: string;
  gpsLocation: {
    lat: number;
    lng: number;
  };
  members: {
    userName: string;
    userId: number;
    status: number;
  }[];
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
