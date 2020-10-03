import React from 'react';
import { makeStyles, Paper, Avatar, Box, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import PostData from '../../../types/PostData';

const useStyles = makeStyles((theme) => ({
  marginRight: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    backgroundColor: theme.palette.grey[700],
  },
}));

interface Props extends Omit<PostData, 'comments'> {}

const Comment: React.FC<Props> = ({ id, firstName, lastName, textContent }) => {
  const classes = useStyles();

  return (
    <Box key={id} display="flex" mb={2}>
      <Avatar className={classes.marginRight}>
        <FaceIcon />
      </Avatar>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
        <Typography variant="body2">{textContent}</Typography>
      </Paper>
    </Box>
  );
};

export default Comment;
