import React from 'react';
import { List, ListProps } from '@material-ui/core';

import Friend from './Friend';
import { User } from '../../store/types/usersTypes';

interface Props extends ListProps {
  friends: User[];
  profileNavigation?: boolean;
}

const FriendsList: React.FC<Props> = ({
  friends,
  profileNavigation = false,
  ...rest
}) => {
  return (
    <List {...rest}>
      {friends.map((friend) => (
        <Friend
          key={friend.userId}
          profileNavigation={profileNavigation}
          {...friend}
        />
      ))}
    </List>
  );
};

export default FriendsList;
