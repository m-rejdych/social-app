import React, { useState } from 'react';
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
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';

import { RootState } from '../../store/reducers';

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 600,
    margin: 0,
    padding: 0,
    fontSize: 24,
  },
  textField: {
    flexGrow: 1,
    margin: theme.spacing(0, 6),
    maxWidth: 500,
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
}));

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const history = useHistory();
  const classes = useStyles();

  const goToProfile = (): void => {
    history.push(`/profile/${userId}`);
  };

  const goToHome = (): void => {
    history.push('/home');
  };

  return (
    <AppBar>
      <Box clone width="100%">
        <Toolbar>
          <Button onClick={goToHome} className={classes.text}>
            Social App
          </Button>
          <TextField
            value={searchValue}
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            variant="outlined"
            className={classes.textField}
            InputProps={{
              startAdornment: <SearchIcon />,
              className: classes.input,
              color: 'secondary',
            }}
            inputProps={{ className: classes.inputElement }}
          />
          <Box ml="auto">
            <IconButton
              onClick={goToProfile}
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
