import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import type { Vehicle } from '../../types/vehicle';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>License Plate</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell>{vehicle.brand}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.color}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>
                {vehicle.active ? 'Yes' : 'No'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VehicleTable;