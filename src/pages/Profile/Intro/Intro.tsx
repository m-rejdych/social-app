import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  makeStyles,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import { RootState } from '../../../store/reducers';

const useStyles = makeStyles((theme) => ({
  introCard: {
    flexGrow: 1,
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  iconMarginRight: {
    marginRight: theme.spacing(1),
  },
}));

interface Props {}

const Component: React.FC<Props> = () => {
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const classes = useStyles();

  const sections = [
    { Icon: HomeIcon, defaultValue: 'No location information' },
    { Icon: LocationOnIcon, defaultValue: 'No country information' },
    { Icon: MenuBookIcon, defaultValue: 'No education information' },
    { Icon: FlashOnIcon, defaultValue: 'No hobby information' },
  ];

  return (
    <Card elevation={3} className={classes.introCard}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        titleTypographyProps={{ variant: 'h4' }}
        classes={{ action: classes.alignSelfEnd }}
        action={
          <Button variant="contained" color="secondary" size="large">
            Edit profile
          </Button>
        }
      />
      <CardContent>
        {sections.map(({ Icon, defaultValue }, index) => (
          <Box display="flex" mb={index === sections.length - 1 ? 0 : 2}>
            <Icon className={classes.iconMarginRight} color="action" />
            <Typography color="textSecondary">{defaultValue}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default Component;
