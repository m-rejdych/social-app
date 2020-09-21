import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import { RootState } from '../../store/reducers';
import EditIntroDialog from './EditIntroDialog';

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

const Intro: React.FC = () => {
  const [showEditIntroDialog, setShowEditIntroDialog] = useState(false);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const classes = useStyles();

  const sections = [
    { Icon: HomeIcon, defaultValue: 'No location information', id: uuid() },
    {
      Icon: LocationOnIcon,
      defaultValue: 'No country information',
      id: uuid(),
    },
    {
      Icon: MenuBookIcon,
      defaultValue: 'No education information',
      id: uuid(),
    },
    { Icon: FlashOnIcon, defaultValue: 'No hobby information', id: uuid() },
  ];

  const openEditIntroDialog = (): void => {
    setShowEditIntroDialog(true);
  };

  const closeEditIntroDialog = (): void => {
    setShowEditIntroDialog(false);
  };

  return (
    <Card elevation={3} className={classes.introCard}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        titleTypographyProps={{ variant: 'h4' }}
        classes={{ action: classes.alignSelfEnd }}
        action={
          <Button
            onClick={openEditIntroDialog}
            variant="contained"
            color="secondary"
            size="large"
          >
            Edit profile
          </Button>
        }
      />
      <CardContent>
        {sections.map(({ Icon, defaultValue, id }, index) => (
          <Box
            key={id}
            display="flex"
            mb={index === sections.length - 1 ? 0 : 2}
          >
            <Icon className={classes.iconMarginRight} color="action" />
            <Typography color="textSecondary">{defaultValue}</Typography>
          </Box>
        ))}
      </CardContent>
      <EditIntroDialog
        open={showEditIntroDialog}
        handleClose={closeEditIntroDialog}
      />
    </Card>
  );
};

export default Intro;
