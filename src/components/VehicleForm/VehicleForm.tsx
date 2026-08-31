import { useState } from 'react';

import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { VehicleType } from '../../types/vehicle';
import type { CreateVehicle } from '../../types/create-vehicle';

interface VehicleFormProps {
  onCreated: (vehicle: CreateVehicle) => void;
}

function VehicleForm({ onCreated }: VehicleFormProps) {
  const [licensePlate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState<VehicleType>(VehicleType.SEDAN);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const vehicle: CreateVehicle = {
      licensePlate,
      brand,
      model,
      year: Number(year),
      color,
      type,
    };

    onCreated(vehicle);
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create vehicle
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
        />

        <TextField
          label="Brand"
          value={brand}
          onChange={(event) =>
            setBrand(event.target.value)
          }
          fullWidth
        />

        <TextField
          label="Model"
          value={model}
          onChange={(event) =>
            setModel(event.target.value)
          }
          fullWidth
        />

        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(event) =>
            setYear(event.target.value)
          }
          fullWidth
        />

        <TextField
          label="Color"
          value={color}
          onChange={(event) =>
            setColor(event.target.value)
          }
          fullWidth
        />

        <TextField
          select
          label="Type"
          value={type}
          onChange={(event) =>
            setType(event.target.value as VehicleType)
          }
          fullWidth
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

        <Button
          type="submit"
          variant="contained"
        >
          Create vehicle
        </Button>
      </Stack>
    </Paper>
  );
}

export default VehicleForm;