import React from 'react';
import { Box, Typography } from '@material-ui/core';

import Post from './Post';
import PostData from '../../types/PostData';

interface Props {
  posts: PostData[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
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
          <Typography variant="h5" color="textSecondary">
            There is no feed to show
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default PostsList;
