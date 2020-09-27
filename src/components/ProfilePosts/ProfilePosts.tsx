import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import PostData from '../../types/PostData';
import PostsList from '../PostsList';
import { sendPost } from '../../store/actions';
import { RootState } from '../../store/reducers';

const useStyles = makeStyles((theme) => ({
  input: {
    borderRadius: 20,
    marginBottom: theme.spacing(3),
  },
}));

const ProfilePosts: React.FC = () => {
  const [value, setValue] = useState('');
  const params = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const firstName = useSelector((state: RootState) => state.profile.firstName);
  const lastName = useSelector((state: RootState) => state.profile.lastName);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  const isMe = params.id === userId;

  const handleSubmit = (): void => {
    const postData: PostData = {
      id: uuid(),
      textContent: value,
      likeCount: 0,
      comments: [],
      userId,
      firstName,
      lastName,
    };

    dispatch(sendPost(postData));
    setValue('');
  };

  return (
    <div>
      {isMe && (
        <TextField
          fullWidth
          multiline
          variant="outlined"
          placeholder="Write a post..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          InputProps={{
            className: classes.input,
            endAdornment: (
              <Button onClick={handleSubmit} color="secondary">
                Send
              </Button>
            ),
          }}
        />
      )}
      <PostsList posts={posts} />
    </div>
  );
};

export default ProfilePosts;
