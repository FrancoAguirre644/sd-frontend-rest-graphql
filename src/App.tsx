import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Vehicles
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Vehicles
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          REST and GraphQL API client
        </Typography>

        <Button variant="contained">
          Test MUI
        </Button>
      </Container>
    </>
  );
}

export default App;