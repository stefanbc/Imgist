// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, Container, Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import FileUpload from './components/FileUpload';
import FileList from './components/FIleList';

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              Cloudflare R2 File Manager
            </Typography>
            <FileUpload />
            <FileList />
          </Box>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;