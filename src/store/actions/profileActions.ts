import { PROFILE } from '../constants';
import {
  ProfileActions,
  ProfileIntro,
  ProfileData,
} from '../types/profileTypes';

const setProfileIntro = (introData: ProfileIntro): ProfileActions => ({
  type: PROFILE.SET_PROFILE_INTRO,
  payload: introData,
});

const setProfileIntroSuccess = (
  introData: Omit<ProfileIntro, 'userId'>,
): ProfileActions => ({
  type: PROFILE.SET_PROFILE_INTRO_SUCCESS,
  payload: introData,
});

const getProfileData = (userId: string): ProfileActions => ({
  type: PROFILE.GET_PROFILE_DATA,
  payload: userId,
});

const getProfileDataSuccess = (profileData: ProfileData): ProfileActions => ({
  type: PROFILE.GET_PROFILE_DATA_SUCCESS,
  payload: profileData,
});

const setProfileError = (error: string): ProfileActions => ({
  type: PROFILE.PROFILE_FAIL,
  payload: error,
});

export {
  setProfileIntro,
  setProfileIntroSuccess,
  setProfileError,
  getProfileData,
  getProfileDataSuccess,
};
