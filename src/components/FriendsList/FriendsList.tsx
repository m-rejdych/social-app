import React from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  ListProps,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import Friend from './Friend';
import { Friend as FriendType } from '../../store/types/profileTypes';
import { RootState } from '../../store/reducers';

interface Props extends ListProps {
  friends: FriendType[];
  profileNavigation?: boolean;
}

const FriendsList: React.FC<Props> = ({
  friends,
  profileNavigation = false,
  ...rest
}) => {
  const loading = useSelector((state: RootState) => state.profile.loading);

  return friends.length > 0 ? (
    <List {...rest}>
      {friends.map((friend) => (
        <Friend
          key={friend.userId}
          profileNavigation={profileNavigation}
          {...friend}
        />
      ))}
    </List>
  ) : (
    <Box
      height="50vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {loading ? (
        <CircularProgress size={150} />
      ) : (
        <Typography variant="h5" color="textSecondary">
          You have no friends
        </Typography>
      )}
    </Box>
  );
};

export default FriendsList;
