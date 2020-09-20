import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import Header from '../../components/Header';
import FriendsList from '../../components/FriendsList';
import PostsList from '../../components/PostsList';

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    minHeight: '100vh',
  },
  gridContainer: {
    position: 'relative',
    top: theme.spacing(8),
    minHeight: `calc(100vh - ${theme.spacing(8)}px)`,
    margin: 0,
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.homeContainer}>
      <Header />
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <PostsList />
        </Grid>
        <Grid item xs={3}>
          <FriendsList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
