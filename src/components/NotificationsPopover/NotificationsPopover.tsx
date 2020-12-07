import React from 'react';
import { Popover } from '@material-ui/core';

import NotificationsList from '../NotificationsList';

interface Props {
  isOpen: boolean;
  anchorEl: (EventTarget & HTMLButtonElement) | null;
  onClose: () => void;
}

const NotificationsPopover: React.FC<Props> = ({
  isOpen,
  anchorEl,
  onClose,
}) => {
  return (
    <Popover
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <NotificationsList />
    </Popover>
  );
};

export default NotificationsPopover;
