export type Bike = {
  color?: string;
  currentOwner?: string;
  engineNumber?: string;
  engineSize?: string;
  id?: string;
  location?: string;
  make?: string;
  mileage?: string;
  model?: string;
  owners?: string[];
  regNumber?: string;
  status?: string;
  vinNumber?: string;
  year?: string;
  image?: string;
};

export type User = {
  email?: string | null;
  uid?: string;
  displayName?: string | null;
  photoURL?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  motorcyclesInThePast?: string[];
  motorcyclesOwned?: string[];
  phoneNumber?: string | null;
  role?: string;
  status?: string;
  zipCode?: string | null;
  id?: string;
};
