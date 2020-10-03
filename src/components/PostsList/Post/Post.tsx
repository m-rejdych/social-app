import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  makeStyles,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

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
  marginLeftIcon: {
    marginLeft: theme.spacing(2),
  },
  borderTop: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Component: React.FC<PostData> = ({
  id,
  textContent,
  firstName,
  lastName,
  likes,
  comments,
}) => {
  const [showComments, setShowComments] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLiked = likes.includes(userId);

  const handleLikeDislike = (): void => {
    isLiked
      ? dispatch(dislikePost({ id, userId }))
      : dispatch(likePost({ id, userId }));
  };

  return (
    <Card elevation={3} className={classes.card}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        avatar={<FaceIcon />}
        titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
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
              className={classNames(
                classes.marginRightIcon,
                classes.marginLeftIcon,
              )}
            />
            <Typography variant="body2">{likes.length}</Typography>
          </Box>
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
            <Typography>Comment</Typography>
          </Button>
        </Box>
      </CardActions>
      {showComments && (
        <CardContent>
          <CommentsList comments={comments} />
        </CardContent>
      )}
    </Card>
  );
};

export default Component;
