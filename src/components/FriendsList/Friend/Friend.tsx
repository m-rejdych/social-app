import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import { setOpen, setTarget as setChatTarget } from '../../../store/actions';

interface Props {
  firstName: string;
  lastName: string;
  userId: string;
  profileNavigation: boolean;
  setTarget: boolean;
}

const Component: React.FC<Props> = ({
  firstName,
  lastName,
  userId,
  profileNavigation,
  setTarget,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (): void => {
    if (profileNavigation) history.push(`/profile/${userId}`);
    else if (setTarget) {
      dispatch(setChatTarget(userId));
      dispatch(setOpen(true));
    }
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
