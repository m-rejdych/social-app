import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { sendNotification } from '../../shared/interactions';

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
  invited: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const Intro: React.FC = () => {
  const [showEditIntroDialog, setShowEditIntroDialog] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const loggedUserId = useSelector((state: RootState) => state.auth.userId);
  const visitedUserId = useSelector(
    (state: RootState) => state.visitedProfile.userId,
  );
  const params = useParams<{ id: string }>();
  const firstName = useSelector(
    (state: RootState) => state.visitedProfile.firstName,
  );
  const lastName = useSelector(
    (state: RootState) => state.visitedProfile.lastName,
  );
  const location = useSelector(
    (state: RootState) => state.visitedProfile.location,
  );
  const country = useSelector(
    (state: RootState) => state.visitedProfile.country,
  );
  const education = useSelector(
    (state: RootState) => state.visitedProfile.education,
  );
  const hobbies = useSelector(
    (state: RootState) => state.visitedProfile.hobbies,
  );
  const loading = useSelector(
    (state: RootState) => state.visitedProfile.loading,
  );
  const notifications = useSelector(
    (state: RootState) => state.visitedProfile.notifications,
  );
  const classes = useStyles();

  useEffect(() => {
    if (
      !loading &&
      notifications.some(
        ({ fromUserId, type }) =>
          type === 'friendRequest' && fromUserId === loggedUserId,
      )
    )
      setIsInvited(true);
  }, [loading]);

  const isMe = params.id === loggedUserId;

  const selectedCountry: Country | undefined = countries.find(
    ({ value }: Country): boolean => value === country,
  );

  const sections = [
    {
      Icon: HomeIcon,
      defaultValue: location,
      id: uuid(),
    },
    {
      Icon: LocationOnIcon,
      defaultValue: selectedCountry?.label || 'No country information',
      id: uuid(),
    },
    {
      Icon: MenuBookIcon,
      defaultValue: education,
      id: uuid(),
    },
    {
      Icon: FlashOnIcon,
      defaultValue: hobbies,
      id: uuid(),
    },
  ];

  const openEditIntroDialog = (): void => {
    setShowEditIntroDialog(true);
  };

  const closeEditIntroDialog = (): void => {
    setShowEditIntroDialog(false);
  };

  const addFriend = async (): Promise<void> => {
    await sendNotification({
      fromName: `${firstName} ${lastName}`,
      fromUserId: loggedUserId,
      toUserId: visitedUserId,
      type: 'friendRequest',
    });
    setIsInvited(true);
  };

  return (
    <Card elevation={3} className={classes.introCard}>
      {loading ? (
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={5}
        >
          <CircularProgress size={175} />
        </Box>
      ) : (
        <>
          <CardHeader
            title={`${firstName} ${lastName}`}
            titleTypographyProps={{ variant: 'h4' }}
            classes={{ action: classes.alignSelfEnd }}
            action={
              <Button
                onClick={isMe ? openEditIntroDialog : addFriend}
                variant="contained"
                color="secondary"
                size="large"
                className={isInvited ? classes.invited : undefined}
              >
                {isMe ? 'Edit intro' : isInvited ? 'Invited' : 'Add friend'}
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
        </>
      )}
    </Card>
  );
};

export default Intro;
