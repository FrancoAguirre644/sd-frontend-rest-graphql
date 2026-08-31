export enum VehicleType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
  PICKUP = 'PICKUP',
  COUPE = 'COUPE',
  HATCHBACK = 'HATCHBACK',
}

export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
  active: boolean;
}