import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from '@material-ui/core';

import Header from '../Header';
import { setNotifications } from '../../store/actions';
import { db } from '../../firebase';
import { RootState } from '../../store/reducers';

const Component: React.FC = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    db.collection('users')
      .doc(userId)
      .onSnapshot(
        (snapshot) => {
          dispatch(setNotifications(snapshot.data()!.notifications));
        },
        (error) => console.log(error),
      );

    return () => {
      db.collection('users')
        .doc(userId)
        .onSnapshot(
          () => {},
          () => {},
        );
    };
  }, []);

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
