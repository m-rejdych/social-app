import React from 'react';
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

interface Props {
  firstName: string;
  lastName: string;
  userId: string;
}

const Component: React.FC<Props> = ({ firstName, lastName, userId }) => {
  return (
    <ListItem key={userId} button>
      <ListItemAvatar>
        <FaceIcon />
      </ListItemAvatar>
      <ListItemText primary={`${firstName} ${lastName}`} />
    </ListItem>
  );
};

export default Component;
