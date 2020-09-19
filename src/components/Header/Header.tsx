import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  makeStyles,
  Button,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';

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
}));

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const classes = useStyles();

  return (
    <AppBar>
      <Box clone width="100%">
        <Toolbar>
          <Button className={classes.text}>Social App</Button>
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
            <IconButton>
              <MailOutlineIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <NotificationsNoneIcon fontSize="large" />
            </IconButton>
            <IconButton>
              <PersonOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
