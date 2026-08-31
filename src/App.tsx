import { useEffect, useState } from 'react';

import {
  Alert,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';

import {
  createVehicle,
  getVehicles,
  searchVehicles,
} from './api/rest/vehicle.api';

import VehicleForm from './components/VehicleForm/VehicleForm';
import VehicleTable from './components/VehicleTable/VehicleTable';

import type { CreateVehicle } from './types/create-vehicle';
import type { Vehicle } from './types/vehicle';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    try {
      setLoading(true);
      setError(null);

      const data = await getVehicles();

      setVehicles(data);
    } catch {
      setError('Failed to load vehicles.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(value: string) {
    setSearch(value);

    if (!value.trim()) {
      loadVehicles();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await searchVehicles(value);

      setVehicles(data);
    } catch {
      setError('Failed to search vehicles.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateVehicle(
    vehicle: CreateVehicle,
  ) {
    try {
      setError(null);

      await createVehicle(vehicle);

      await loadVehicles();
    } catch {
      setError('Failed to create vehicle.');
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>

      <VehicleForm
        onCreated={handleCreateVehicle}
      />

      <TextField
        label="Search vehicles"
        variant="outlined"
        value={search}
        onChange={(event) =>
          handleSearch(event.target.value)
        }
        fullWidth
        sx={{ my: 3 }}
      />

      {loading && <CircularProgress />}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <VehicleTable vehicles={vehicles} />
      )}
    </Container>
  );
}

export default App;