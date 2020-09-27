import React from 'react';
import { v4 as uuid } from 'uuid';

import Post from './Post';
import PostData from '../../types/PostData';

interface Props {
  posts: PostData[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  const dummyPosts = [
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
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostsList;
