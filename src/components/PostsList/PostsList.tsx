import React from 'react';

import Post from './Post';
import PostData from '../../types/PostData';

interface Props {
  posts: PostData[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsList;
