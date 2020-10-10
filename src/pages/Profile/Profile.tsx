import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, Box } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { getVisitedProfileData } from '../../store/actions';
import { getPosts } from '../../store/actions';
import { RootState } from '../../store/reducers';
import PageWrapper from '../../components/PageWrapper';
import Intro from '../../components/Intro';

import ProfileContent from '../../components/ProfileContent';

const useStyles = makeStyles((theme) => ({
  gridMarginReset: {
    margin: 0,
  },
  profileIcon: {
    height: 300,
    width: 300,
  },
}));

const Profile: React.FC = () => {
  const friends = useSelector((state: RootState) => state.profile.friends);
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVisitedProfileData(params.id));
  }, [params.id, friends]);

  useEffect(() => {
    dispatch(getPosts([params.id]));
  }, [params.id]);

  return (
    <PageWrapper>
      <Grid container className={classes.gridMarginReset}>
        <Grid item xs={2} />
        <Grid
          item
          container
          spacing={3}
          xs={8}
          className={classes.gridMarginReset}
        >
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountBoxIcon className={classes.profileIcon} />
              <Intro />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ProfileContent />
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </PageWrapper>
  );
};

export default Profile;
