import React from 'react';
import { List, ListSubheader, Typography } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import Friend from './Friend';

interface Friend {
  firstName: string;
  lastName: string;
  userId: string;
}

const friends = [
  { firstName: 'Lorem', lastName: 'Ipsum', userId: uuid() },
  { firstName: 'Lorem', lastName: 'Ipsum', userId: uuid() },
  { firstName: 'Lorem', lastName: 'Ipsum', userId: uuid() },
  { firstName: 'Lorem', lastName: 'Ipsum', userId: uuid() },
  { firstName: 'Lorem', lastName: 'Ipsum', userId: uuid() },
];

const FriendsList: React.FC = () => {
  return (
    <List>
      <ListSubheader>
        <Typography variant="h5">Friends</Typography>
      </ListSubheader>
      {friends.map(
        (friend: Friend): JSX.Element => (
          <Friend {...friend} />
        ),
      )}
    </List>
  );
};

export default FriendsList;
