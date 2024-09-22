// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ErrorBoundary from './components/ErrorBoundary';
import FileUpload from './components/FileUpload';
import FileList from './components/FIleList';

const queryClient = new QueryClient();
const theme = createTheme();

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Cloudflare R2 File Manager</h1>
            <FileUpload />
            <FileList />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;