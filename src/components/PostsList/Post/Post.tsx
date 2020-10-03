import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  makeStyles,
  Box,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CloseIcon from '@material-ui/icons/Close';

import PostData from '../../../types/PostData';
import CommentsList from '../../CommentsList';
import { RootState } from '../../../store/reducers';
import { likePost, dislikePost } from '../../../store/actions';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
  marginRightIcon: {
    marginRight: theme.spacing(1),
  },
  borderTop: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  fontBold: {
    fontWeight: 600,
  },
}));

const Post: React.FC<PostData> = ({
  id,
  userId,
  textContent,
  firstName,
  lastName,
  likes,
  comments,
}) => {
  const [showComments, setShowComments] = useState(false);
  const loggedUserId = useSelector((state: RootState) => state.auth.userId);
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLiked = likes.includes(userId);
  const isMine = loggedUserId === userId;

  const handleLikeDislike = (): void => {
    isLiked
      ? dispatch(dislikePost({ id, userId: loggedUserId }))
      : dispatch(likePost({ id, userId: loggedUserId }));
  };

  return (
    <Card elevation={3} className={classes.card}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        avatar={<FaceIcon />}
        action={
          isMine && (
            <IconButton>
              <CloseIcon color="action" />
            </IconButton>
          )
        }
        titleTypographyProps={{
          variant: 'h6',
          color: 'textSecondary',
          className: classes.fontBold,
        }}
        className={classes.borderBottom}
      />
      <CardContent>
        <Typography gutterBottom variant="body1">
          {textContent}
        </Typography>
        {likes.length > 0 ? (
          <Box display="flex" alignItems="center">
            <FavoriteIcon
              fontSize="small"
              color={isLiked ? 'error' : 'disabled'}
              className={classes.marginRightIcon}
            />
            <Typography variant="body2">{likes.length}</Typography>
          </Box>
        ) : null}
        {comments.length > 0 ? (
          <Typography
            color="textSecondary"
            variant="body2"
          >{`Comments: ${comments.length}`}</Typography>
        ) : null}
      </CardContent>
      <CardActions className={classes.borderTop}>
        <Box display="flex" width="100%">
          <Button onClick={handleLikeDislike} fullWidth>
            {isLiked ? (
              <FavoriteIcon className={classes.marginRightIcon} color="error" />
            ) : (
              <FavoriteBorderIcon className={classes.marginRightIcon} />
            )}
            <Typography>Like</Typography>
          </Button>
          <Button
            fullWidth
            color={showComments ? 'secondary' : 'default'}
            onClick={() => setShowComments((prev) => !prev)}
          >
            <ChatBubbleOutlineIcon className={classes.marginRightIcon} />
            <Typography>Comments</Typography>
          </Button>
        </Box>
      </CardActions>
      {showComments && (
        <CardContent>
          <CommentsList postId={id} comments={comments} />
        </CardContent>
      )}
    </Card>
  );
};

export default Post;
