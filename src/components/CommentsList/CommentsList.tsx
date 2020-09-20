import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Paper,
  Typography,
  Box,
  makeStyles,
  TextField,
  Button,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import PostData from '../../types/PostData';
import Comment from './Comment';
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
  comments: Omit<PostData, 'comments'>[];
}

const CommentsList: React.FC<Props> = ({ comments }) => {
  const [commentValue, setCommentValue] = useState('');
  const classes = useStyles();

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
            variant="filled"
            placeholder="Comment..."
            multiline
            InputProps={{
              endAdornment: (
                <Button size="small" color="secondary">
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
