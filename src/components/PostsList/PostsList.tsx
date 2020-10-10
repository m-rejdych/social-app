import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, CircularProgress } from '@material-ui/core';

import Post from './Post';
import PostData from '../../types/PostData';
import { RootState } from '../../store/reducers';

interface Props {
  posts: PostData[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  const loading = useSelector((state: RootState) => state.posts.loading);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <Post {...post} key={post.id} />)
      ) : (
        <Box
          height="50vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <CircularProgress size={150} />
          ) : (
            <Typography variant="h5" color="textSecondary">
              There is no feed to show
            </Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default PostsList;
