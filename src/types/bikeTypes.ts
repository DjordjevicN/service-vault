export type Bike = {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  engineSize: number;
  topSpeed: number;
  weight: number;
  vinNumber: string;
  engineNumber: string;
  image: string;
  owners: string[];
};

export type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  image: string;
  motorcyclesOwned: string[];
  motorcyclesInThePast: string[];
};
