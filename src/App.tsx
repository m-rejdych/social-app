import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { RootState } from './store/reducers';
import { loadUser } from './store/actions';
import { auth } from './firebase';

const App: React.FC = () => {
  const [checkAuth, setCheckAuth] = useState(true);
  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        const { email, uid, displayName } = user;
        const firstName = displayName!.slice(0, displayName!.indexOf(' '));
        const lastName = displayName!.slice(displayName!.indexOf(' ') + 1);
        dispatch(loadUser({ email, userId: uid, firstName, lastName }));
      }
      setCheckAuth(false);
    });
  }, []);

  return (
    <Box minHeight="100vh">
      {checkAuth ? (
        <Box
          display="flex"
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={300} />
        </Box>
      ) : (
        <Switch>
          {userId && <Route path="/home" component={Home} />}
          <Route path="/" exact component={LandingPage} />
          <Redirect to="/" />
        </Switch>
      )}
    </Box>
  );
};

export default App;
