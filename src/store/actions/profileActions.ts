import { PROFILE } from '../constants';
import {
  ProfileActions,
  ProfileIntro,
  ProfileData,
  ProfileDetails,
  Friend,
  Messages,
} from '../types/profileTypes';
import Notification from '../../types/Notificaiton';
import Message from '../../types/Message';

const setProfileIntro = (introData: ProfileIntro): ProfileActions => ({
  type: PROFILE.SET_PROFILE_INTRO,
  payload: introData,
});

const setProfileIntroSuccess = (introData: ProfileIntro): ProfileActions => ({
  type: PROFILE.SET_PROFILE_INTRO_SUCCESS,
  payload: introData,
});

const setFriends = (friends: Friend[]): ProfileActions => ({
  type: PROFILE.SET_FRIENDS,
  payload: friends,
});

const getProfileData = (userId: string): ProfileActions => ({
  type: PROFILE.GET_PROFILE_DATA,
  payload: userId,
});

const getProfileDataSuccess = (profileData: ProfileData): ProfileActions => ({
  type: PROFILE.GET_PROFILE_DATA_SUCCESS,
  payload: profileData,
});

const updateProfileField = (data: {
  userId: string;
  fieldData: Partial<ProfileDetails>;
}): ProfileActions => ({
  type: PROFILE.UPDATE_PROFILE_FIELD,
  payload: data,
});

const updateProfileFieldSuccess = (
  fieldData: Partial<ProfileDetails>,
): ProfileActions => ({
  type: PROFILE.UPDATE_PROFILE_FIELD_SUCCESS,
  payload: fieldData,
});

const setNotifications = (notifications: Notification[]): ProfileActions => ({
  type: PROFILE.SET_NOTIFICATIONS,
  payload: notifications,
});

const setProfileError = (error: string): ProfileActions => ({
  type: PROFILE.PROFILE_FAIL,
  payload: error,
});

export {
  setProfileIntro,
  setProfileIntroSuccess,
  setProfileError,
  setFriends,
  getProfileData,
  getProfileDataSuccess,
  updateProfileField,
  updateProfileFieldSuccess,
  setNotifications,
};
