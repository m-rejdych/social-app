import React from 'react';
import { Fab, makeStyles, useTheme } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Chat: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Fab color="secondary" className={classes.fab}>
      <RateReviewIcon
        fontSize="large"
        htmlColor={theme.palette.background.default}
      />
    </Fab>
  );
};

export default Chat;
