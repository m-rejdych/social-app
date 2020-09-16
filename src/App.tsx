import React from 'react';
import LandingPage from './pages/LandingPage';
import { Box } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Box minHeight="100vh">
      <LandingPage />
    </Box>
  );
};

export default App;
