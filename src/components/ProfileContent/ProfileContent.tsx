import React, { useState } from 'react';
import { makeStyles, AppBar, Tabs, Tab, Box } from '@material-ui/core';

import About from '../About';
import ProfilePosts from '../ProfilePosts';

interface TabPanelProps {
  value: number;
  index: number;
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({
  value,
  index,
  children,
  ...other
}) => {
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  fontBold: {
    fontWeight: 600,
  },
}));

const ProfileContent: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="About" classes={{ root: classes.fontBold }} />
          <Tab label="Posts" classes={{ root: classes.fontBold }} />
          <Tab label="Friends" classes={{ root: classes.fontBold }} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <About />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfilePosts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Friends
      </TabPanel>
    </div>
  );
};

export default ProfileContent;
