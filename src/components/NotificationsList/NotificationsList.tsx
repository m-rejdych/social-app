import React from 'react';
import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';

import { RootState } from '../../store/reducers';
import Notification from './Notification';

const NotificationsList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.profile.notifications,
  );

  return (
    <List>
      {notifications.map((notification) => (
        <Notification {...notification} />
      ))}
    </List>
  );
};

export default NotificationsList;
