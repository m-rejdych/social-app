import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  makeStyles,
  Paper,
  Avatar,
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

import CommentType from '../../../types/Comment';
import {
  deleteComment,
  likeComment,
  dislikeComment,
} from '../../../store/actions';
import { RootState } from '../../../store/reducers';

const useStyles = makeStyles((theme) => ({
  marginRight: {
    marginRight: theme.spacing(1),
  },
  marginRightSmall: {
    marginRight: theme.spacing(0.5),
  },
  paper: {
    padding: theme.spacing(1, 2),
    borderRadius: 10,
    position: 'relative',
    minWidth: '20%',
  },
  backgroundGrey: {
    backgroundColor: theme.palette.grey[700],
  },
  fontBold: {
    fontWeight: 600,
  },
  likeButton: {
    position: 'absolute',
    top: `calc(100% + ${theme.spacing(0.5)}px)`,
    left: theme.spacing(2),
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
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
  likes,
}) => {
  const loggedUserId = useSelector((state: RootState) => state.auth.userId);
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const isMine = userId === loggedUserId;
  const isLiked = likes.includes(loggedUserId);

  const handleDelete = (): void => {
    dispatch(deleteComment({ postId, commentId: id }));
  };

  const handleLikeDislike = (): void => {
    isLiked
      ? dispatch(
          dislikeComment({ postId, commentId: id, userId: loggedUserId }),
        )
      : dispatch(likeComment({ postId, commentId: id, userId: loggedUserId }));
  };

  return (
    <Box key={id} display="flex" mb={4}>
      <Avatar className={classes.marginRight}>
        <FaceIcon />
      </Avatar>
      <Paper
        elevation={2}
        className={classNames(classes.paper, classes.backgroundGrey)}
      >
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
        <Typography
          variant="caption"
          color={isLiked ? 'textPrimary' : 'textSecondary'}
          className={classes.likeButton}
          onClick={handleLikeDislike}
        >
          Like
        </Typography>
        {likes.length > 0 && (
          <Box
            display="flex"
            position="absolute"
            p={0.5}
            top="85%"
            right={theme.spacing(2)}
            className={classes.backgroundGrey}
            borderRadius={20}
          >
            <FavoriteOutlinedIcon
              fontSize="small"
              color={isLiked ? 'error' : 'action'}
              className={classes.marginRightSmall}
            />
            <Typography
              color={isLiked ? 'textPrimary' : 'textSecondary'}
              variant="body2"
            >
              {likes.length}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Comment;
