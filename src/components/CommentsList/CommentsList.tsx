import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  Avatar,
  Paper,
  Box,
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import Comment from './Comment';
import CommentType from '../../types/Comment';
import { comment } from '../../store/actions';
import { RootState } from '../../store/reducers';

const useStyles = makeStyles((theme) => ({
  marginRight: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    backgroundColor: theme.palette.grey[700],
  },
  input: {
    backgroundColor: 'inherit !important',
    padding: theme.spacing(1.5),
  },
}));

interface Props {
  comments: CommentType[];
  postId: string;
}

const CommentsList: React.FC<Props> = ({ postId, comments }) => {
  const [commentValue, setCommentValue] = useState('');
  const userId = useSelector((state: RootState) => state.auth.userId);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleComment = (): void => {
    if (commentValue.trim()) {
      const commentData = {
        firstName,
        lastName,
        userId,
        id: uuid(),
        likes: [],
        textContent: commentValue,
      };
      dispatch(
        comment({
          postId,
          comment: commentData,
        }),
      );
      setCommentValue('');
    }
  };

  return (
    <div>
      <Box display="flex" mb={5}>
        <Avatar className={classes.marginRight}>
          <FaceIcon />
        </Avatar>
        <Paper elevation={2} className={classes.paper}>
          <TextField
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            type="text"
            variant="filled"
            placeholder="Comment..."
            multiline
            InputProps={{
              endAdornment: (
                <Button size="small" color="secondary" onClick={handleComment}>
                  Send
                </Button>
              ),
              className: classes.input,
            }}
          />
        </Paper>
      </Box>
      {comments.map((comment) => (
        <Comment {...comment} />
      ))}
    </div>
  );
};

export default CommentsList;
