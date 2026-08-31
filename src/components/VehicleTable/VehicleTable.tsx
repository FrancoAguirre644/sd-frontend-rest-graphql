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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
            <TableCell>Patente</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Año</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Activo</TableCell>
            <TableCell>Acciones</TableCell>
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
                {vehicle.active ? 'Sí' : 'No'}
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onEdit(vehicle)}
                  startIcon={<EditIcon />}
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(vehicle)}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
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