import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import { setOpen, setTarget as setChatTarget } from '../../../store/actions';
import { RootState } from '../../../store/reducers';

interface Props {
  firstName: string;
  lastName: string;
  userId: string;
  profileNavigation: boolean;
  setTarget: boolean;
  showBadges: boolean;
}

const Component: React.FC<Props> = ({
  firstName,
  lastName,
  userId,
  profileNavigation,
  setTarget,
  showBadges,
}) => {
  const history = useHistory();
  const messages = useSelector((state: RootState) => state.profile.messages);
  const dispatch = useDispatch();

  const badgeContent = messages[userId]
    ? messages[userId].filter(({ isSeen }) => !isSeen).length
    : 0;
  console.log(badgeContent);

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
        {showBadges ? (
          <Badge color="secondary" badgeContent={badgeContent}>
            <FaceIcon />
          </Badge>
        ) : (
          <FaceIcon />
        )}
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ color: 'textSecondary' }}
        primary={`${firstName} ${lastName}`}
      />
    </ListItem>
  );
};

export default Component;
