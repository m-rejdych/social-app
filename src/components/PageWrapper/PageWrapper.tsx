import React from 'react';
import { Box, useTheme } from '@material-ui/core';

import Header from '../Header';
import Chat from '../Chat';

const Component: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Box
        position="relative"
        top={theme.spacing(8)}
        minHeight={`calc(100vh - ${theme.spacing(8)}px)`}
      >
        {children}
        <Chat />
      </Box>
    </>
  );
};

export default Component;
