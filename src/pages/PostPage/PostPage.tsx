import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, CircularProgress, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import PageWrapper from '../../components/PageWrapper';
import Post from '../../components/PostsList/Post';
import PostData from '../../types/PostData';
import { getPost } from '../../store/actions';
import { RootState } from '../../store/reducers';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
  },
}));

const PostPage: React.FC = () => {
  const currentPost = useSelector(
    (state: RootState) => state.posts.currentPost,
  );
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(params.id));
  }, [params.id]);

  return (
    <PageWrapper>
      {Object.keys(currentPost).length > 0 ? (
        <Container className={classes.container}>
          <Post {...(currentPost as PostData)} />
        </Container>
      ) : (
        <CircularProgress />
      )}
    </PageWrapper>
  );
};

export default PostPage;
