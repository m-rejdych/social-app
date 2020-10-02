import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import NotificationType from '../../../types/Notificaiton';
import { NOTIFICATION_TYPES } from '../../../shared/constants';

const Notification: React.FC<NotificationType> = ({ fromName, type }) => {
  const renderMessage = (): string => {
    switch (type) {
      case NOTIFICATION_TYPES.FRIEND_REQUEST:
        return `${fromName} wants to add you as a friend!`;
      default:
        return 'Watch out!';
    }
  };

  return (
    <ListItem button>
      <ListItemIcon>
        <NewReleasesIcon color="secondary" />
      </ListItemIcon>
      <ListItemText>{renderMessage()}</ListItemText>
    </ListItem>
  );
};

export default Notification;
