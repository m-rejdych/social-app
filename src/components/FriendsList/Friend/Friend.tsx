import React from 'react';
import { useHistory } from 'react-router-dom';
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

interface Props {
  firstName: string;
  lastName: string;
  userId: string;
  profileNavigation: boolean;
}

const Component: React.FC<Props> = ({
  firstName,
  lastName,
  userId,
  profileNavigation,
}) => {
  const history = useHistory();

  const handleClick = (): void => {
    if (profileNavigation) history.push(`/profile/${userId}`);
  };

  return (
    <ListItem
      key={userId}
      button
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <ListItemAvatar>
        <FaceIcon />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ color: 'textSecondary' }}
        primary={`${firstName} ${lastName}`}
      />
    </ListItem>
  );
};

export default Component;
