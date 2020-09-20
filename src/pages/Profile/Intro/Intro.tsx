import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';

import { RootState } from '../../../store/reducers';

const useStyles = makeStyles((theme) => ({
  introCard: {
    flexGrow: 1,
  },
}));

interface Props {}

const Component: React.FC<Props> = () => {
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.introCard}>
      <CardHeader title={`${firstName} ${lastName}`} />
    </Card>
  );
};

export default Component;
