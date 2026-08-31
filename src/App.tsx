import { useEffect, useState } from 'react';

import {
  Container,
  Typography,
} from '@mui/material';

import { getVehicles } from './api/rest/vehicle.api';
import type { Vehicle } from './types/vehicle';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">
        Vehicles
      </Typography>

      <Typography>
        Vehicles found: {vehicles.length}
      </Typography>
    </Container>
  );
}

export default App;