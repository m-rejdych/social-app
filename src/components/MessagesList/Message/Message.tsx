import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Paper, makeStyles, Typography } from '@material-ui/core';

import MessageType from '../../../types/Message';
import { RootState } from '../../../store/reducers';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 20,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[700],
    position: 'relative',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
  myMessage: {
    backgroundColor: theme.palette.primary.dark,
    alignSelf: 'flex-end',
  },
  breakWord: {
    wordBreak: 'break-word',
  },
  name: {
    position: 'absolute',
    bottom: `calc(100% + ${theme.spacing(0.25)}px)`,
    left: theme.spacing(2),
  },
  alignRight: {
    left: 'auto',
    right: theme.spacing(2),
  },
}));

const Message: React.FC<MessageType> = ({ from, fromUserId, messageText }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const classes = useStyles();

  const isMe = userId === fromUserId;

  return (
    <Paper
      elevation={3}
      className={classNames(classes.paper, isMe && classes.myMessage)}
    >
      <Typography className={classes.breakWord}>{messageText}</Typography>{' '}
      <Typography
        noWrap
        variant="caption"
        color="textSecondary"
        className={classNames(classes.name, isMe && classes.alignRight)}
      >
        {from}
      </Typography>
    </Paper>
  );
};

export default Message;
