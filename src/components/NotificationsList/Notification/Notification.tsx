import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  useTheme,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import NotificationType from '../../../types/Notificaiton';
import { deleteNotification } from '../../../shared/interactions';
import { addFriend } from '../../../store/actions';
import { NOTIFICATION_TYPES } from '../../../shared/constants';

const Notification: React.FC<NotificationType> = ({
  fromName,
  fromUserId,
  toUserId,
  type,
  id,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDeleteNotification = (): void => {
    deleteNotification(toUserId, id);
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
      case NOTIFICATION_TYPES.FRIEND_APPROVAL:
        return `${fromName} accepted your friend request!`;
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
        return (
          <IconButton onClick={handleDeleteNotification} size="small">
            <CloseIcon color="error" />
          </IconButton>
        );
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
