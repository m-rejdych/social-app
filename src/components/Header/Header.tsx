import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 600,
    margin: 0,
    padding: 0,
    fontSize: 24,
  },
}));

interface Props {}

const Header: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Box clone width="100%">
        <Toolbar>
          <Button className={classes.text}>Social App</Button>
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
