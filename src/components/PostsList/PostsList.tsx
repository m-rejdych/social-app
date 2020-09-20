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
      id: uuid(),
      textContent:
        'Lorem ipsum dolor ametLorem ipsum dolor ameLorem ipsum dolor ameLorem ipsum dolor ameLorem ipsum dolor ameLorem ipsum dolor ameLorem ipsum dolor ameLorem ipsum dolor amettttttt',
      firstName: 'Bob',
      lastName: 'Sterling',
      likeCount: 3,
      comments: [
        {
          userId: uuid(),
          id: uuid(),
          firstName: 'Helga',
          lastName: 'Foofson',
          textContent: 'Comment ipsum dolor amet',
          likeCount: 5,
        },
      ],
    },
    {
      userId: uuid(),
      id: uuid(),
      textContent: 'Lorem ipsum dolor amet',
      firstName: 'Bob',
      lastName: 'Sterling',
      likeCount: 3,
      comments: [
        {
          userId: uuid(),
          id: uuid(),
          firstName: 'Helga',
          lastName: 'Foofson',
          textContent: 'Comment ipsum dolor amet',
          likeCount: 5,
        },
      ],
    },
    {
      userId: uuid(),
      id: uuid(),
      textContent: 'Lorem ipsum dolor amet',
      firstName: 'Bob',
      lastName: 'Sterling',
      likeCount: 3,
      comments: [
        {
          userId: uuid(),
          id: uuid(),
          firstName: 'Helga',
          lastName: 'Foofson',
          textContent: 'Comment ipsum dolor amet',
          likeCount: 5,
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
