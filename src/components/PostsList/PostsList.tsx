import React from 'react';
import { makeStyles } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import Post from './Post';

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const PostsList: React.FC = () => {
  const classes = useStyles();

  const posts = [
    {
      userId: uuid(),
      textContent: 'Lorem ipsum dolor amet',
      firstName: 'Bob',
      lastName: 'Sterling',
      likeCount: 3,
      comments: [
        {
          userId: uuid(),
          firstName: 'Helga',
          lastName: 'Foofson',
          textContent: 'Comment ipsum dolor amet',
        },
      ],
    },
    {
      userId: uuid(),
      textContent: 'Lorem ipsum dolor amet',
      firstName: 'Bob',
      lastName: 'Sterling',
      likeCount: 3,
      comments: [
        {
          userId: uuid(),
          firstName: 'Helga',
          lastName: 'Foofson',
          textContent: 'Comment ipsum dolor amet',
        },
      ],
    },
    {
      userId: uuid(),
      textContent: 'Lorem ipsum dolor amet',
      firstName: 'Bob',
      lastName: 'Sterling',
      likeCount: 3,
      comments: [
        {
          userId: uuid(),
          firstName: 'Helga',
          lastName: 'Foofson',
          textContent: 'Comment ipsum dolor amet',
        },
      ],
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </div>
  );
};

export default PostsList;
