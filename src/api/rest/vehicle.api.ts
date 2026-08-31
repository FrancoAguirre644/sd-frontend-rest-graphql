import { API_CONFIG } from '../../config/api';
import type { CreateVehicle } from '../../types/create-vehicle';
import type { Vehicle } from '../../types/vehicle';

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(
    `${API_CONFIG.rest.baseUrl}/vehicles`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  return response.json();
}

export async function searchVehicles(
  search: string,
): Promise<Vehicle[]> {
  const response = await fetch(
    `${API_CONFIG.rest.baseUrl}/vehicles/search?search=${encodeURIComponent(search)}`,
  );

  if (!response.ok) {
    throw new Error('Failed to search vehicles');
  }

  return response.json();
}

export async function createVehicle(
  vehicle: CreateVehicle,
): Promise<Vehicle> {
  const response = await fetch(
    `${API_CONFIG.rest.baseUrl}/vehicles`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to create vehicle');
  }

  return response.json();
}

export async function updateVehicle(
  id: number,
  vehicle: CreateVehicle,
): Promise<Vehicle> {
  const response = await fetch(
    `${API_CONFIG.rest.baseUrl}/vehicles/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to update vehicle');
  }

  return response.json();
}

export async function deleteVehicle(
  id: number,
): Promise<void> {
  const response = await fetch(
    `${API_CONFIG.rest.baseUrl}/vehicles/${id}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to delete vehicle');
  }
}