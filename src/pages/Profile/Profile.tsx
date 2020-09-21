import React from 'react';
import { Grid, makeStyles, Box } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import PageWrapper from '../../components/PageWrapper';
import Intro from '../../components/Intro';

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
  const classes = useStyles();

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
