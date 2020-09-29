import { VISITED_PROFILE } from '../constants';
import { VisitedProfileActions } from '../types/visitedProfileTypes';
import { ProfileActions, ProfileData } from '../types/profileTypes';

const getVisitedProfileData = (userId: string): VisitedProfileActions => ({
  type: VISITED_PROFILE.GET_VISITED_PROFILE_DATA,
  payload: userId,
});

const getVisitedProfileDataSuccess = (
  profileData: ProfileData,
): VisitedProfileActions => ({
  type: VISITED_PROFILE.GET_VISITED_PROFILE_DATA_SUCCESS,
  payload: profileData,
});

const setVisitedProfileError = (error: string): ProfileActions => ({
  type: VISITED_PROFILE.VISITED_PROFILE_FAIL,
  payload: error,
});

export {
  getVisitedProfileData,
  getVisitedProfileDataSuccess,
  setVisitedProfileError,
};
