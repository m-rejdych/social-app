import React from 'react';
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

interface Props {
  userId: string;
  textContent: string;
  firstName: string;
  lastName: string;
  likeCount: number;
  comments: {
    userId: string;
    firstName: string;
    lastName: string;
    textContent: string;
  }[];
}

const Component: React.FC<Props> = ({
  userId,
  textContent,
  firstName,
  lastName,
  likeCount,
}) => {
  const classes = useStyles();

  return (
    <Card key={userId} elevation={3} className={classes.card}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        avatar={<FaceIcon />}
        titleTypographyProps={{ variant: 'h6' }}
        className={classes.borderBottom}
      />
      <CardContent>
        <Typography gutterBottom variant="body1">
          {textContent}
        </Typography>
        {likeCount && (
          <Box display="flex" alignItems="center">
            <FavoriteIcon
              fontSize="small"
              color="disabled"
              className={classNames(
                classes.marginRightIcon,
                classes.marginLeftIcon,
              )}
            />
            <Typography variant="body2">{likeCount}</Typography>
          </Box>
        )}
      </CardContent>
      <CardActions className={classes.borderTop}>
        <Box display="flex" width="100%">
          <Button fullWidth>
            <FavoriteBorderIcon className={classes.marginRightIcon} />
            <Typography>Like</Typography>
          </Button>
          <Button fullWidth>
            <ChatBubbleOutlineIcon className={classes.marginRightIcon} />
            <Typography>Comment</Typography>
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Component;
