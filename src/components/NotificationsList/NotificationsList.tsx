import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import { RootState } from '../../store/reducers';
import Notification from './Notification';

const NotificationsList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.profile.notifications,
  );

  return (
    <List>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))
      ) : (
        <ListItem>
          <ListItemIcon>
            <NotInterestedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>You don't have any notificaitons</ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default NotificationsList;
