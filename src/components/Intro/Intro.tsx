import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';
import UndoIcon from '@material-ui/icons/Undo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { RootState } from '../../store/reducers';
import EditIntroDialog from './EditIntroDialog';
import Country from '../../types/Country';
import countries from '../../shared/countries';
import {
  sendNotification,
  unsendFriendRequest,
} from '../../shared/interactions';
import { deleteFriend } from '../../store/actions';

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
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const Intro: React.FC = () => {
  const [showEditIntroDialog, setShowEditIntroDialog] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const loggedUserId = useSelector((state: RootState) => state.auth.userId);
  const loggedFirstName = useSelector(
    (state: RootState) => state.auth.firstName,
  );
  const loggedLastName = useSelector((state: RootState) => state.auth.lastName);
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
  const friends = useSelector(
    (state: RootState) => state.visitedProfile.friends,
  );
  const dispatch = useDispatch();
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

  const isFriend = friends.includes(loggedUserId);

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

  const toggleIsButtonHovered = (): void => {
    setIsButtonHovered((isHovered) => !isHovered);
  };

  const addFriend = async (): Promise<void> => {
    await sendNotification({
      fromName: `${loggedFirstName} ${loggedLastName}`,
      fromUserId: loggedUserId,
      toUserId: visitedUserId,
      type: 'friendRequest',
      isSeen: false,
      id: uuid(),
    });
    setIsInvited(true);
  };

  const undoAddFriend = async (): Promise<void> => {
    await unsendFriendRequest(loggedUserId, visitedUserId);
    setIsInvited(false);
  };

  const handleClick = (): void => {
    if (isMe) openEditIntroDialog();
    else if (isInvited) undoAddFriend();
    else if (isFriend)
      dispatch(deleteFriend({ userId: loggedUserId, friendId: visitedUserId }));
    else addFriend();
  };

  const renderStartIcon = (): JSX.Element => {
    if (isMe) return <EditIcon />;
    if (isFriend && isButtonHovered) return <DeleteIcon />;
    if (isFriend) return <DoneAllIcon />;
    if (!isInvited) return <PersonAddIcon />;
    if (isInvited && !isButtonHovered) return <CheckIcon />;
    return <UndoIcon />;
  };

  const renderButtonText = (): string => {
    if (isMe) return 'Edit intro';
    if (isFriend && isButtonHovered) return 'Delete friend';
    if (isFriend) return 'Friends';
    if (!isInvited) return 'Add friend';
    if (isInvited && !isButtonHovered) return 'Invited';
    return 'Cancel request';
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
                onClick={handleClick}
                onMouseEnter={toggleIsButtonHovered}
                onMouseLeave={toggleIsButtonHovered}
                variant="contained"
                color="secondary"
                size="large"
                className={isInvited || isFriend ? classes.invited : undefined}
                startIcon={renderStartIcon()}
              >
                {renderButtonText()}
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
