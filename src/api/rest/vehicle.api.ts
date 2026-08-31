import { API_CONFIG } from '../../config/api';
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