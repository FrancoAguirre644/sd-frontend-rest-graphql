import {
  Button,
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
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

function VehicleTable({
  vehicles,
  onEdit,
  onDelete,
}: VehicleTableProps) {
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>

              <TableCell>
                {vehicle.licensePlate}
              </TableCell>

              <TableCell>
                {vehicle.brand}
              </TableCell>

              <TableCell>
                {vehicle.model}
              </TableCell>

              <TableCell>
                {vehicle.year}
              </TableCell>

              <TableCell>
                {vehicle.color}
              </TableCell>

              <TableCell>
                {vehicle.type}
              </TableCell>

              <TableCell>
                {vehicle.active ? 'Yes' : 'No'}
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onEdit(vehicle)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(vehicle)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VehicleTable;