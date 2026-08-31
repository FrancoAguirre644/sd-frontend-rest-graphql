import type { CreateVehicle } from '../types/create-vehicle';
import type { Vehicle } from '../types/vehicle';

import * as restApi from './rest/vehicle.api';
import * as graphqlApi from './graphql/vehicle.api';

export type ApiType = 'rest' | 'graphql';

export interface VehicleApi {
  getVehicles(): Promise<Vehicle[]>;

  searchVehicles(
    search: string,
  ): Promise<Vehicle[]>;

  createVehicle(
    vehicle: CreateVehicle,
  ): Promise<Vehicle>;

  updateVehicle(
    id: number,
    vehicle: CreateVehicle,
  ): Promise<Vehicle>;

  deleteVehicle(
    id: number,
  ): Promise<void>;
}

const apiClients: Record<ApiType, VehicleApi> = {
  rest: restApi,
  graphql: graphqlApi,
};

export function getVehicleApi(
  apiType: ApiType,
): VehicleApi {
  return apiClients[apiType];
}