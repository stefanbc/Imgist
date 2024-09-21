import React from 'react';
import { Container, Typography } from '@mui/material';
import ImageUploader from './components/ImageUploader';
import ImageList from './components/ImageList';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Container>
        <Typography variant="h4" className="text-center my-4">Image Manager</Typography>
        <ImageUploader />
        <ImageList />
      </Container>
    </ErrorBoundary>
  );
};

export default App;
