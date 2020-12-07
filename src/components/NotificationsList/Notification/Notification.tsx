import React from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import DeleteIcon from '@material-ui/icons/Delete';

import NotificationType from '../../../types/Notificaiton';
import {
  deleteNotification,
  addFriend,
  sendNotification,
} from '../../../shared/interactions';
import { NOTIFICATION_TYPES } from '../../../shared/constants';
import { RootState } from '../../../store/reducers';

const Notification: React.FC<NotificationType> = ({
  fromName,
  fromUserId,
  toUserId,
  type,
  id,
  goToPost,
  postId,
}) => {
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const history = useHistory();
  const theme = useTheme();

  const handleDeleteNotification = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.stopPropagation();
    deleteNotification(toUserId, id);
  };

  const handleAddFriend = (): void => {
    addFriend(toUserId, fromUserId);
    sendNotification({
      fromUserId: toUserId,
      fromName: `${firstName} ${lastName}`,
      toUserId: fromUserId,
      id: uuid(),
      isSeen: false,
      type: NOTIFICATION_TYPES.FRIEND_APPROVAL,
    });
    deleteNotification(toUserId, id);
  };

  const handleClick = (): void => {
    if (goToPost) history.push(`/post/${postId}`);
  };

  const renderMessage = (): string => {
    switch (type) {
      case NOTIFICATION_TYPES.FRIEND_REQUEST:
        return `${fromName} wants to add you as a friend!`;
      case NOTIFICATION_TYPES.FRIEND_APPROVAL:
        return `${fromName} accepted your friend request!`;
      case NOTIFICATION_TYPES.POST_LIKE:
        return `${fromName} liked your post!`;
      case NOTIFICATION_TYPES.COMMENT:
        return `${fromName} commented on your post!`;
      case NOTIFICATION_TYPES.COMMENT_LIKE:
        return `${fromName} liked your comment!`;
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
              <IconButton
                onClick={(e) => handleDeleteNotification(e)}
                size="small"
              >
                <CloseIcon color="error" />
              </IconButton>
            </Box>
          </>
        );
      default:
        return (
          <IconButton onClick={handleDeleteNotification} size="small">
            <DeleteIcon color="error" />
          </IconButton>
        );
    }
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon>{renderIcon()}</ListItemIcon>
      <ListItemText>{renderMessage()}</ListItemText>
    </ListItem>
  );
};

export default Notification;
