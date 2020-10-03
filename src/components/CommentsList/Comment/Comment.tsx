import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Paper,
  Avatar,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import CloseIcon from '@material-ui/icons/Close';

import CommentType from '../../../types/Comment';
import { deleteComment } from '../../../store/actions';
import { RootState } from '../../../store/reducers';

const useStyles = makeStyles((theme) => ({
  marginRight: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    backgroundColor: theme.palette.grey[700],
  },
  fontBold: {
    fontWeight: 600,
  },
}));

interface Props extends CommentType {
  postId: string;
}

const Comment: React.FC<Props> = ({
  id,
  postId,
  userId,
  firstName,
  lastName,
  textContent,
}) => {
  const loggedUserId = useSelector((state: RootState) => state.auth.userId);
  const classes = useStyles();
  const dispatch = useDispatch();

  const isMine = userId === loggedUserId;

  const handleDelete = (): void => {
    dispatch(deleteComment({ postId, commentId: id }));
  };

  return (
    <Box key={id} display="flex" mb={2}>
      <Avatar className={classes.marginRight}>
        <FaceIcon />
      </Avatar>
      <Paper elevation={2} className={classes.paper}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="subtitle1"
            className={classes.fontBold}
          >{`${firstName} ${lastName}`}</Typography>
          {isMine && (
            <IconButton size="small" onClick={handleDelete}>
              <CloseIcon fontSize="small" color="action" />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2">{textContent}</Typography>
      </Paper>
    </Box>
  );
};

export default Comment;
