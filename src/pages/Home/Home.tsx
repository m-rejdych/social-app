import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import FriendsList from '../../components/FriendsList';
import PostsList from '../../components/PostsList';
import PageWrapper from '../../components/PageWrapper';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: 0,
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <PageWrapper>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <PostsList />
        </Grid>
        <Grid item xs={3}>
          <FriendsList />
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
