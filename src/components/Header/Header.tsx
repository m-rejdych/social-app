import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  makeStyles,
  Button,
  Typography,
  Badge,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';

import FriendsList from '../FriendsList';
import NotificationsPopover from '../NotificationsPopover';
import { RootState } from '../../store/reducers';
import { User } from '../../store/types/usersTypes';
import { updateProfileField } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 600,
    margin: 0,
    padding: 0,
    fontSize: 24,
  },
  textField: {
    margin: theme.spacing(0, 6),
  },
  input: {
    borderRadius: 40,
  },
  inputElement: {
    padding: theme.spacing(1.4, 1),
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  profileButtonRadius: {
    borderRadius: 20,
  },
  user: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: '0 0 10px 10px',
  },
}));

type AnchorEl = EventTarget & HTMLButtonElement;

interface NotificationsPopover {
  isOpen: boolean;
  anchorEl: AnchorEl | null;
}

const Header: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchFieldPosition, setSearchFieldPosition] = useState({
    left: 0,
    width: 0,
  });
  const [notificaitonsPopover, setNotificaitonsPopover] = useState<
    NotificationsPopover
  >({
    isOpen: false,
    anchorEl: null,
  });
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const loggedUserId = useSelector((state: RootState) => state.auth.userId);
  const users = useSelector((state: RootState) => state.users.users);
  const notifications = useSelector(
    (state: RootState) => state.profile.notifications,
  );
  const searchRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const searchFieldRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (searchFieldRef && searchFieldRef.current) {
      const { left, width } = searchFieldRef.current.getBoundingClientRect();
      setSearchFieldPosition({ left, width });
    }
  }, []);

  const showSearchList =
    isFocused && searchValue.length > 0 && filteredUsers.length > 0;

  const notificationsCount = notifications.filter(({ isSeen }) => !isSeen)
    .length;

  const goToProfile = (userId: string): void => {
    history.push(`/profile/${userId}`);
    setSearchValue('');
  };

  const goToHome = (): void => {
    history.push('/home');
  };

  const filterUsers = (value: string): void => {
    if (value) {
      const filteredUsers = users.filter(({ firstName, lastName, userId }) => {
        if (loggedUserId !== userId) {
          return (
            firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            lastName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            `${firstName} ${lastName}`
              .toLowerCase()
              .indexOf(value.toLowerCase()) !== -1
          );
        }
        return false;
      });
      setFilteredUsers(filteredUsers);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setSearchValue(e.target.value);
    filterUsers(e.target.value);
  };

  const handleCloseNotificationsPopover = (): void => {
    setNotificaitonsPopover({ ...notificaitonsPopover, isOpen: false });
  };

  const toggleNotifications = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isSeen: true,
    }));
    dispatch(
      updateProfileField({
        userId: loggedUserId,
        fieldData: { notifications: updatedNotifications },
      }),
    );
    setNotificaitonsPopover({ isOpen: true, anchorEl: e.currentTarget });
  };

  const clearSearchField = (): void => {
    setSearchValue('');
    if (searchRef && searchRef.current) searchRef.current.blur();
  };

  return (
    <AppBar>
      <NotificationsPopover
        {...notificaitonsPopover}
        onClose={handleCloseNotificationsPopover}
      />
      <Box clone width="100%" position="relative">
        <Toolbar>
          <Button onClick={goToHome} className={classes.text}>
            Social App
          </Button>
          <Box display="flex" flexGrow={1} maxWidth={500}>
            <TextField
              fullWidth
              ref={searchFieldRef}
              value={searchValue}
              type="search"
              placeholder="Search..."
              onChange={(e) => handleChange(e)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              variant="outlined"
              className={classes.textField}
              inputRef={searchRef}
              InputProps={{
                startAdornment: <SearchIcon />,
                className: classes.input,
                color: 'secondary',
              }}
              inputProps={{ className: classes.inputElement }}
            />
          </Box>
          {showSearchList && (
            <Box
              position="absolute"
              top="100%"
              left={searchFieldPosition.left}
              width={searchFieldPosition.width}
            >
              <FriendsList
                friends={filteredUsers}
                className={classes.list}
                onClick={clearSearchField}
                profileNavigation
              />
            </Box>
          )}
          <Box ml="auto">
            <IconButton
              onClick={() => goToProfile(loggedUserId)}
              className={classes.profileButtonRadius}
            >
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.marginRight}
              >{`${firstName} ${lastName}`}</Typography>
              <PersonOutlineIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <MailOutlineIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={(e) => toggleNotifications(e)}>
              <Badge color="secondary" badgeContent={notificationsCount}>
                <NotificationsNoneIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
