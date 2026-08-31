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
  mutation CreateVehicle($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
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
    $id: Int!
    $input: UpdateVehicleInput!
  ) {
    updateVehicle(
      id: $id
      input: $input
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
  mutation DeleteVehicle($id: Int!) {
    deleteVehicle(id: $id)
  }
`;

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(
    API_CONFIG.graphql.baseUrl,
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

  const responseText = await response.text();

  if (!response.ok) {
    console.error('GraphQL HTTP error:', {
      status: response.status,
      statusText: response.statusText,
      url: API_CONFIG.graphql.baseUrl,
      body: responseText,
    });

    throw new Error(
      `GraphQL request failed: ${response.status} ${response.statusText}`,
    );
  }

  let result: GraphQLResponse<T>;

  try {
    result = JSON.parse(responseText);
  } catch {
    console.error(
      'Invalid GraphQL response:',
      responseText,
    );

    throw new Error(
      'GraphQL server returned an invalid response',
    );
  }

  if (result.errors?.length) {
    console.error(
      'GraphQL errors:',
      result.errors,
    );

    throw new Error(
      result.errors
        .map((error) => error.message)
        .join(', '),
    );
  }

  if (!result.data) {
    throw new Error(
      'GraphQL response contains no data',
    );
  }

  return result.data;
}

export async function getVehicles(): Promise<Vehicle[]> {
  const data =
    await graphqlRequest<GetVehiclesData>(
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
        input: vehicle,
      },
    );

  return data.createVehicle;
}

export async function updateVehicle(
  id: number,
  vehicle: CreateVehicle,
): Promise<Vehicle> {
  const numericId = Number(id);
  
  const data =
    await graphqlRequest<UpdateVehicleData>(
      UPDATE_VEHICLE,
      {
        id: numericId,
        input: vehicle,
      },
    );

  return data.updateVehicle;
}

export async function deleteVehicle(
  id: number,
): Promise<void> {
  const numericId = Number(id);

  await graphqlRequest<DeleteVehicleData>(
    DELETE_VEHICLE,
    {
      id: numericId,
    },
  );
}