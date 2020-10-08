import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import PageWrapper from '../../components/PageWrapper';
import PostsList from '../../components/PostsList';
import { getPosts } from '../../store/actions';
import { RootState } from '../../store/reducers';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: 0,
  },
}));

const Home: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const friends = useSelector((state: RootState) => state.profile.friends);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   [...friends, userId].forEach((friendId) => {
  //     dispatch(getPosts({ userId: friendId, merge: true }));
  //   });
  // }, [friends, userId]);

  return (
    <PageWrapper>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <PostsList posts={posts} />
        </Grid>
        <Grid item xs={3}>
          {/* <FriendsList /> */}
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
