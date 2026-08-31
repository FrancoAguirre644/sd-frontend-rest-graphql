import {
  gql,
  type TypedDocumentNode,
} from '@apollo/client';

import { apolloClient } from './apollo';

import type { CreateVehicle } from '../../types/create-vehicle';
import type { Vehicle } from '../../types/vehicle';

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

interface SearchVehiclesVariables {
  search: string;
}

interface CreateVehicleVariables {
  input: CreateVehicle;
}

interface UpdateVehicleVariables {
  id: number;
  input: CreateVehicle;
}

interface DeleteVehicleVariables {
  id: number;
}

const GET_VEHICLES: TypedDocumentNode<
  GetVehiclesData
> = gql`
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

const SEARCH_VEHICLES: TypedDocumentNode<
  SearchVehiclesData,
  SearchVehiclesVariables
> = gql`
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

const CREATE_VEHICLE: TypedDocumentNode<
  CreateVehicleData,
  CreateVehicleVariables
> = gql`
  mutation CreateVehicle(
    $input: CreateVehicleInput!
  ) {
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

const UPDATE_VEHICLE: TypedDocumentNode<
  UpdateVehicleData,
  UpdateVehicleVariables
> = gql`
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

const DELETE_VEHICLE: TypedDocumentNode<
  DeleteVehicleData,
  DeleteVehicleVariables
> = gql`
  mutation DeleteVehicle($id: Int!) {
    deleteVehicle(id: $id)
  }
`;

export async function getVehicles(): Promise<Vehicle[]> {
  const { data } =
    await apolloClient.query({
      query: GET_VEHICLES,
      fetchPolicy: 'network-only',
    });

  if (!data) {
    throw new Error(
      'GraphQL response contains no data.',
    );
  }

  return data.vehicles;
}

export async function searchVehicles(
  search: string,
): Promise<Vehicle[]> {
  const { data } =
    await apolloClient.query({
      query: SEARCH_VEHICLES,
      variables: {
        search,
      },
      fetchPolicy: 'network-only',
    });

  if (!data) {
    throw new Error(
      'GraphQL response contains no data.',
    );
  }

  return data.searchVehicles;
}

export async function createVehicle(
  vehicle: CreateVehicle,
): Promise<Vehicle> {
  const { data } =
    await apolloClient.mutate({
      mutation: CREATE_VEHICLE,
      variables: {
        input: vehicle,
      },
    });

  if (!data) {
    throw new Error(
      'GraphQL response contains no data.',
    );
  }

  return data.createVehicle;
}

export async function updateVehicle(
  id: number,
  vehicle: CreateVehicle,
): Promise<Vehicle> {
  const { data } =
    await apolloClient.mutate({
      mutation: UPDATE_VEHICLE,
      variables: {
        id: Number(id),
        input: vehicle,
      },
    });

  if (!data) {
    throw new Error(
      'GraphQL response contains no data.',
    );
  }

  return data.updateVehicle;
}

export async function deleteVehicle(
  id: number,
): Promise<void> {
  const { data } =
    await apolloClient.mutate({
      mutation: DELETE_VEHICLE,
      variables: {
        id: Number(id),
      },
    });

  if (!data) {
    throw new Error(
      'GraphQL response contains no data.',
    );
  }

  if (!data.deleteVehicle) {
    throw new Error(
      'No se pudo eliminar el vehículo.',
    );
  }
}