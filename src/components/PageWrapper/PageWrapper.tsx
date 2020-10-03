import React from 'react';
import { Box, useTheme } from '@material-ui/core';

import Header from '../Header';

const Component: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Box
        clone
        position="relative"
        top={theme.spacing(8)}
        minHeight={`calc(100vh - ${theme.spacing(8)}px)`}
      >
        {children}
      </Box>
    </>
  );
};

export default Component;
