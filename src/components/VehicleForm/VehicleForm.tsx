import { useEffect, useState } from 'react';

import {
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import type { CreateVehicle } from '../../types/create-vehicle';
import { VehicleType } from '../../types/vehicle';
import type { Vehicle } from '../../types/vehicle';

interface VehicleFormProps {
  vehicle?: Vehicle;
  onCreated: (vehicle: CreateVehicle) => Promise<void>;
  onUpdated?: (vehicle: CreateVehicle) => Promise<void>;
  onCancel?: () => void;
}

function VehicleForm({
  vehicle,
  onCreated,
  onUpdated,
  onCancel,
}: VehicleFormProps) {
  const [licensePlate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState<VehicleType>(
    VehicleType.SEDAN,
  );

  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(vehicle);

  useEffect(() => {
    if (vehicle) {
      setLicensePlate(vehicle.licensePlate);
      setBrand(vehicle.brand);
      setModel(vehicle.model);
      setYear(String(vehicle.year));
      setColor(vehicle.color);
      setType(vehicle.type);
    }
  }, [vehicle]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const data: CreateVehicle = {
      licensePlate,
      brand,
      model,
      year: Number(year),
      color,
      type,
    };

    try {
      setLoading(true);

      if (isEditing) {
        await onUpdated?.(data);
        return;
      }

      await onCreated(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit vehicle' : 'Create vehicle'}
      </Typography>

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit}
      >
        <TextField
          label="License Plate"
          value={licensePlate}
          onChange={(event) =>
            setLicensePlate(event.target.value)
          }
          fullWidth
          disabled={loading}
        />

        <TextField
          label="Brand"
          value={brand}
          onChange={(event) =>
            setBrand(event.target.value)
          }
          fullWidth
          disabled={loading}
        />

        <TextField
          label="Model"
          value={model}
          onChange={(event) =>
            setModel(event.target.value)
          }
          fullWidth
          disabled={loading}
        />

        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(event) =>
            setYear(event.target.value)
          }
          fullWidth
          disabled={loading}
        />

        <TextField
          label="Color"
          value={color}
          onChange={(event) =>
            setColor(event.target.value)
          }
          fullWidth
          disabled={loading}
        />

        <TextField
          select
          label="Type"
          value={type}
          onChange={(event) =>
            setType(event.target.value as VehicleType)
          }
          fullWidth
          disabled={loading}
        >
          {Object.values(VehicleType).map((vehicleType) => (
            <MenuItem
              key={vehicleType}
              value={vehicleType}
            >
              {vehicleType}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : undefined
            }
          >
            {loading
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
                ? 'Update vehicle'
                : 'Create vehicle'}
          </Button>

          {isEditing && onCancel && (
            <Button
              type="button"
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default VehicleForm;