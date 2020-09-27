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
  CircularProgress,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import { RootState } from '../../store/reducers';
import EditIntroDialog from './EditIntroDialog';
import Country from '../../types/Country';
import countries from '../../shared/countries';

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
  const location = useSelector((state: RootState) => state.profile.location);
  const country = useSelector((state: RootState) => state.profile.country);
  const education = useSelector((state: RootState) => state.profile.education);
  const hobbies = useSelector((state: RootState) => state.profile.hobbies);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const classes = useStyles();

  const selectedCountry: Country | undefined = countries.find(
    ({ value }: Country): boolean => value === country,
  );

  const sections = [
    {
      Icon: HomeIcon,
      defaultValue: location || 'No location information',
      id: uuid(),
    },
    {
      Icon: LocationOnIcon,
      defaultValue: selectedCountry?.label || 'No country information',
      id: uuid(),
    },
    {
      Icon: MenuBookIcon,
      defaultValue: education || 'No education information',
      id: uuid(),
    },
    {
      Icon: FlashOnIcon,
      defaultValue: hobbies || 'No hobby information',
      id: uuid(),
    },
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
            Edit intro
          </Button>
        }
      />
      <CardContent>
        {loading ? (
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={145} />
          </Box>
        ) : (
          sections.map(({ Icon, defaultValue, id }, index) => (
            <Box
              key={id}
              display="flex"
              mb={index === sections.length - 1 ? 0 : 2}
            >
              <Icon className={classes.iconMarginRight} color="action" />
              <Typography color="textSecondary">{defaultValue}</Typography>
            </Box>
          ))
        )}
      </CardContent>
      <EditIntroDialog
        open={showEditIntroDialog}
        handleClose={closeEditIntroDialog}
      />
    </Card>
  );
};

export default Intro;
