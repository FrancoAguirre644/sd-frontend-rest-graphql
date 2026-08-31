import { API_CONFIG } from '../../config/api';
import type { CreateVehicle } from '../../types/create-vehicle';
import type { Vehicle } from '../../types/vehicle';

interface GraphQLError {
  message: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

interface GetVehiclesData {
  vehicles: Vehicle[];
}

interface SearchVehiclesData {
  searchVehicles: Vehicle[];
}

interface CreateVehicleData {
  createVehicle: Vehicle;
}

interface UpdateVehicleData {
  updateVehicle: Vehicle;
}

interface DeleteVehicleData {
  deleteVehicle: boolean;
}

const GET_VEHICLES = `
  query GetVehicles {
    vehicles {
      id
      licensePlate
      brand
      model
      year
      color
      type
      active
    }
  }
`;

const SEARCH_VEHICLES = `
  query SearchVehicles($search: String!) {
    searchVehicles(search: $search) {
      id
      licensePlate
      brand
      model
      year
      color
      type
      active
    }
  }
`;

const CREATE_VEHICLE = `
  mutation CreateVehicle($vehicle: CreateVehicleInput!) {
    createVehicle(vehicle: $vehicle) {
      id
      licensePlate
      brand
      model
      year
      color
      type
      active
    }
  }
`;

const UPDATE_VEHICLE = `
  mutation UpdateVehicle(
    $id: ID!
    $vehicle: UpdateVehicleInput!
  ) {
    updateVehicle(
      id: $id
      vehicle: $vehicle
    ) {
      id
      licensePlate
      brand
      model
      year
      color
      type
      active
    }
  }
`;

const DELETE_VEHICLE = `
  mutation DeleteVehicle($id: ID!) {
    deleteVehicle(id: $id)
  }
`;

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(
    API_CONFIG.graphql.url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('GraphQL request failed');
  }

  const result: GraphQLResponse<T> =
    await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error('GraphQL response contains no data');
  }

  return result.data;
}

export async function getVehicles(): Promise<Vehicle[]> {
  const data = await graphqlRequest<GetVehiclesData>(
    GET_VEHICLES,
  );

  return data.vehicles;
}

export async function searchVehicles(
  search: string,
): Promise<Vehicle[]> {
  const data =
    await graphqlRequest<SearchVehiclesData>(
      SEARCH_VEHICLES,
      {
        search,
      },
    );

  return data.searchVehicles;
}

export async function createVehicle(
  vehicle: CreateVehicle,
): Promise<Vehicle> {
  const data =
    await graphqlRequest<CreateVehicleData>(
      CREATE_VEHICLE,
      {
        vehicle,
      },
    );

  return data.createVehicle;
}

export async function updateVehicle(
  id: number,
  vehicle: CreateVehicle,
): Promise<Vehicle> {
  const data =
    await graphqlRequest<UpdateVehicleData>(
      UPDATE_VEHICLE,
      {
        id: String(id),
        vehicle,
      },
    );

  return data.updateVehicle;
}

export async function deleteVehicle(
  id: number,
): Promise<void> {
  await graphqlRequest<DeleteVehicleData>(
    DELETE_VEHICLE,
    {
      id: String(id),
    },
  );
}