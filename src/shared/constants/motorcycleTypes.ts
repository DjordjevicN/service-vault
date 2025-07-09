export type Motorcycle = {
  id: number;
  userId: number; // owner
  created_at: string;
  brand: string;
  model: string;
  year: number;
  type: string; // e.g., sport, cruiser, touring
  engineCapacity: number; // in cc
  horsepower: number;
  mileage: number; // in km
  imageUrls: string[]; // gallery
  description: string;
  customMods?: string[]; // optional mods list
  maintenanceHistory?: {
    date: string;
    description: string;
    mileage: number;
  }[];
  forSale: boolean;
  price?: number; // only if forSale is true
  location?: {
    country: string;
    city: string;
    gps?: {
      lat: number;
      lng: number;
    };
  };
};
