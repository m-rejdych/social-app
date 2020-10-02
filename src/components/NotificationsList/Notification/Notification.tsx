import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  useTheme,
} from '@material-ui/core';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import NotificationType from '../../../types/Notificaiton';
import { deleteNotification } from '../../../shared/interactions';
import { addFriend } from '../../../store/actions';
import { NOTIFICATION_TYPES } from '../../../shared/constants';
import { RootState } from '../../../store/reducers';

const Notification: React.FC<NotificationType> = ({
  fromName,
  fromUserId,
  toUserId,
  type,
  id,
}) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDeleteNotification = (): void => {
    deleteNotification(userId, id);
  };

  const handleAddFriend = (): void => {
    dispatch(
      addFriend({ notificationId: id, userId: toUserId, friendId: fromUserId }),
    );
  };

  const renderMessage = (): string => {
    switch (type) {
      case NOTIFICATION_TYPES.FRIEND_REQUEST:
        return `${fromName} wants to add you as a friend!`;
      default:
        return 'Watch out!';
    }
  };

  const renderIcon = (): JSX.Element => {
    switch (type) {
      case NOTIFICATION_TYPES.FRIEND_REQUEST:
        return (
          <>
            <IconButton onClick={handleAddFriend} size="small">
              <CheckIcon htmlColor={theme.palette.success.main} />
            </IconButton>
            <Box clone mr={2}>
              <IconButton onClick={handleDeleteNotification} size="small">
                <CloseIcon color="error" />
              </IconButton>
            </Box>
          </>
        );
      default:
        return <NewReleasesIcon color="secondary" />;
    }
  };

  return (
    <ListItem button>
      <ListItemIcon>{renderIcon()}</ListItemIcon>
      <ListItemText>{renderMessage()}</ListItemText>
    </ListItem>
  );
};

export default Notification;
