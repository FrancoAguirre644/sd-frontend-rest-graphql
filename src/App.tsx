import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import {
  getVehicleApi,
  type ApiType,
} from './api/vehicle.api';

import VehicleForm from './components/VehicleForm/VehicleForm';
import VehicleTable from './components/VehicleTable/VehicleTable';

import type { CreateVehicle } from './types/create-vehicle';
import type { Vehicle } from './types/vehicle';

type NotificationSeverity =
  | 'success'
  | 'error';

function App() {
  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [search, setSearch] =
    useState('');

  const [editingVehicle, setEditingVehicle] =
    useState<Vehicle | undefined>();

  const [deletingVehicle, setDeletingVehicle] =
    useState<Vehicle | undefined>();

  const [apiType, setApiType] =
    useState<ApiType>('rest');

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [formOpen, setFormOpen] =
    useState(false);

  const [notification, setNotification] =
    useState<{
      open: boolean;
      message: string;
      severity: NotificationSeverity;
    }>({
      open: false,
      message: '',
      severity: 'success',
    });

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
      setError('No se pudieron cargar los vehículos.');
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

      const data =
        await api.searchVehicles(value);

      setVehicles(data);
    } catch {
      setError('No se pudieron buscar los vehículos.');
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

      setFormOpen(false);

      showNotification(
        'Vehículo creado correctamente.',
        'success',
      );
    } catch (e) {
      console.log(e);

      setError('No se pudo crear el vehículo.');

      showNotification(
        'No se pudo crear el vehículo.',
        'error',
      );
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

      setFormOpen(false);

      showNotification(
        'Vehículo actualizado correctamente.',
        'success',
      );
    } catch {
      setError('No se pudo actualizar el vehículo.');

      showNotification(
        'No se pudo actualizar el vehículo.',
        'error',
      );
    }
  }

  function handleCreate() {
    setEditingVehicle(undefined);
    setFormOpen(true);
  }

  function handleEdit(vehicle: Vehicle) {
    setEditingVehicle(vehicle);
    setFormOpen(true);
  }

  function handleCloseForm() {
    setFormOpen(false);
    setEditingVehicle(undefined);
  }

  function handleDeleteVehicle(
    vehicle: Vehicle,
  ) {
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

      showNotification(
        'Vehículo eliminado correctamente.',
        'success',
      );
    } catch {
      setError('No se pudo eliminar el vehículo.');

      showNotification(
        'No se pudo eliminar el vehículo.',
        'error',
      );
    }
  }

  function handleApiChange(
    value: ApiType,
  ) {
    setApiType(value);
    setSearch('');
  }

  function showNotification(
    message: string,
    severity: NotificationSeverity,
  ) {
    setNotification({
      open: true,
      message,
      severity,
    });
  }

  function handleCloseNotification(
    _event?: Event | React.SyntheticEvent,
    reason?: string,
  ) {
    if (reason === 'clickaway') {
      return;
    }

    setNotification((current) => ({
      ...current,
      open: false,
    }));
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h4"
          >
            Gestión de vehículos
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          sx={{ p: 2 }}
        >
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
          >
            <FormControl
              sx={{ minWidth: 180 }}
              size="small"
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

            <Button
              variant="contained"
              onClick={handleCreate}
              size="small"
              startIcon={<AddIcon />}
            >
              Nuevo vehículo
            </Button>
          </Stack>
        </Paper>

        <TextField
          label="Buscar vehículos"
          variant="outlined"
          value={search}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          fullWidth
        />

        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <Typography color="text.secondary">
              Cargando vehículos...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <VehicleTable
            vehicles={vehicles}
            onEdit={handleEdit}
            onDelete={handleDeleteVehicle}
          />
        )}
      </Stack>

      <Dialog
        open={formOpen}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {editingVehicle
            ? 'Editar vehículo'
            : 'Nuevo vehículo'}
        </DialogTitle>

        <DialogContent
          sx={{
            p: 0,
          }}
        >
          <VehicleForm
            vehicle={editingVehicle}
            onCreated={handleCreateVehicle}
            onUpdated={handleUpdateVehicle}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deletingVehicle)}
        onClose={() =>
          setDeletingVehicle(undefined)
        }
      >
        <DialogTitle>
          Eliminar vehículo
        </DialogTitle>

        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar el
            vehículo{' '}
            <strong>
              {deletingVehicle?.licensePlate}
            </strong>
            ?
          </Typography>
        </DialogContent>

        <Stack
          direction="row"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Button
            onClick={() =>
              setDeletingVehicle(undefined)
            }
          >
            Cancelar
          </Button>

          <Button
            onClick={confirmDeleteVehicle}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </Stack>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{
            width: '100%',
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;