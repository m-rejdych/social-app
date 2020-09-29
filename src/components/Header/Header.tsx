import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
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
  Tooltip,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';
import FaceIcon from '@material-ui/icons/Face';

import { RootState } from '../../store/reducers';
import { User } from '../../store/types/usersTypes';

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
}));

const Header: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const loggedUserId = useSelector((state: RootState) => state.auth.userId);
  const users = useSelector((state: RootState) => state.users.users);
  const searchRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const history = useHistory();
  const classes = useStyles();

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

  return (
    <AppBar>
      <Box clone width="100%">
        <Toolbar>
          <Button onClick={goToHome} className={classes.text}>
            Social App
          </Button>
          <Tooltip
            interactive
            placement="bottom-start"
            open={
              isFocused && searchValue.length > 0 && filteredUsers.length > 0
            }
            title={filteredUsers.map(({ firstName, lastName, userId }) => (
              <Box
                display="flex"
                alignItems="center"
                px={2}
                py={1}
                className={classes.user}
                onClick={() => goToProfile(userId)}
              >
                <FaceIcon className={classes.marginRight} />
                <Typography
                  key={userId}
                  variant="h6"
                >{`${firstName} ${lastName}`}</Typography>
              </Box>
            ))}
          >
            <Box display="flex" flexGrow={1} maxWidth={500}>
              <TextField
                fullWidth
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
          </Tooltip>
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
            <IconButton>
              <NotificationsNoneIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
