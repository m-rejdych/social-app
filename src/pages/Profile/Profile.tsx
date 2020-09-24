import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, makeStyles, Box } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import PageWrapper from '../../components/PageWrapper';
import Intro from '../../components/Intro';
import { getProfileData } from '../../store/actions';
import { RootState } from '../../store/reducers';

const useStyles = makeStyles((theme) => ({
  gridMarginReset: {
    margin: 0,
  },
  profileIcon: {
    height: 300,
    width: 300,
  },
}));

const Component: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileData(userId));
  }, [userId, dispatch]);

  return (
    <PageWrapper>
      <Grid container className={classes.gridMarginReset}>
        <Grid item xs={2} />
        <Grid
          item
          container
          spacing={3}
          xs={8}
          className={classes.gridMarginReset}
        >
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountBoxIcon className={classes.profileIcon} />
              <Intro />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </PageWrapper>
  );
};

export default Component;
