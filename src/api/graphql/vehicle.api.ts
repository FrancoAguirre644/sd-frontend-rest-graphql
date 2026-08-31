import { API_CONFIG } from '../../config/api';
import type { Vehicle } from '../../types/vehicle';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
}

interface GetVehiclesData {
  vehicles: Vehicle[];
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

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(
    API_CONFIG.graphql.url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_VEHICLES,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  const result: GraphQLResponse<GetVehiclesData> =
    await response.json();

  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }

  return result.data?.vehicles ?? [];
}