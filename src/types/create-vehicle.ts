import { VehicleType } from './vehicle';

export interface CreateVehicle {
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
}