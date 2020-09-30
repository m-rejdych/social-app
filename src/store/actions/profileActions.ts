import { PROFILE } from '../constants';
import {
  ProfileActions,
  ProfileIntro,
  ProfileData,
  ProfileDetails,
  Notification,
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

const addFriend = (friendId: string): ProfileActions => ({
  type: PROFILE.ADD_FRIEND,
  payload: friendId,
});

const addFriendSuccess = (friendId: string): ProfileActions => ({
  type: PROFILE.ADD_FRIEND_SUCCESS,
  payload: friendId,
});

const sendNotification = (notification: Notification): ProfileActions => ({
  type: PROFILE.SEND_NOTIFICATION,
  payload: notification,
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
  updateProfileField,
  updateProfileFieldSuccess,
  sendNotification,
  addFriend,
  addFriendSuccess,
};
