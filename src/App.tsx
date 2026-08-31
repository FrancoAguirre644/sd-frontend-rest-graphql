import { useEffect, useState } from 'react';

import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {
  getVehicleApi,
  type ApiType,
} from './api/vehicle.api';

import VehicleForm from './components/VehicleForm/VehicleForm';
import VehicleTable from './components/VehicleTable/VehicleTable';

import type { CreateVehicle } from './types/create-vehicle';
import type { Vehicle } from './types/vehicle';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [search, setSearch] = useState('');

  const [editingVehicle, setEditingVehicle] =
    useState<Vehicle | undefined>();

  const [deletingVehicle, setDeletingVehicle] =
    useState<Vehicle | undefined>();

  const [apiType, setApiType] =
    useState<ApiType>('rest');

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
  }, [apiType]);

  async function loadVehicles() {
    try {
      setLoading(true);
      setError(null);

      const api = getVehicleApi(apiType);

      const data = await api.getVehicles();

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
      await loadVehicles();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const api = getVehicleApi(apiType);

      const data = await api.searchVehicles(value);

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

      const api = getVehicleApi(apiType);

      await api.createVehicle(vehicle);

      await loadVehicles();
    } catch (e) {
      console.log(e);
      setError('Failed to create vehicle.');
    }
  }

  async function handleUpdateVehicle(
    vehicle: CreateVehicle,
  ) {
    if (!editingVehicle) {
      return;
    }

    try {
      setError(null);

      const api = getVehicleApi(apiType);

      await api.updateVehicle(
        editingVehicle.id,
        vehicle,
      );

      setEditingVehicle(undefined);

      await loadVehicles();
    } catch {
      setError('Failed to update vehicle.');
    }
  }

  function handleDeleteVehicle(vehicle: Vehicle) {
    setDeletingVehicle(vehicle);
  }

  async function confirmDeleteVehicle() {
    if (!deletingVehicle) {
      return;
    }

    try {
      setError(null);

      const api = getVehicleApi(apiType);

      await api.deleteVehicle(
        deletingVehicle.id,
      );

      setDeletingVehicle(undefined);

      await loadVehicles();
    } catch {
      setError('Failed to delete vehicle.');
    }
  }

  function handleApiChange(value: ApiType) {
    setApiType(value);
    setSearch('');
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Vehicles
      </Typography>

      <FormControl
        sx={{ mb: 3, minWidth: 180 }}
      >
        <InputLabel id="api-select-label">
          API
        </InputLabel>

        <Select
          labelId="api-select-label"
          value={apiType}
          label="API"
          onChange={(event) =>
            handleApiChange(
              event.target.value as ApiType,
            )
          }
        >
          <MenuItem value="rest">
            REST
          </MenuItem>

          <MenuItem value="graphql">
            GraphQL
          </MenuItem>
        </Select>
      </FormControl>

      <VehicleForm
        vehicle={editingVehicle}
        onCreated={handleCreateVehicle}
        onUpdated={handleUpdateVehicle}
        onCancel={() =>
          setEditingVehicle(undefined)
        }
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

      {loading && (
        <CircularProgress />
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <VehicleTable
          vehicles={vehicles}
          onEdit={setEditingVehicle}
          onDelete={handleDeleteVehicle}
        />
      )}

      <Dialog
        open={Boolean(deletingVehicle)}
        onClose={() =>
          setDeletingVehicle(undefined)
        }
      >
        <DialogTitle>
          Delete vehicle
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete vehicle{' '}
            <strong>
              {deletingVehicle?.licensePlate}
            </strong>
            ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeletingVehicle(undefined)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={confirmDeleteVehicle}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;