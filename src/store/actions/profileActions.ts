import { PROFILE } from '../constants';
import {
  ProfileActions,
  ProfileIntro,
  ProfileData,
  ProfileDetails,
  AddFriendData,
} from '../types/profileTypes';
import Notification from '../../types/Notificaiton';

const setProfileIntro = (introData: ProfileIntro): ProfileActions => ({
  type: PROFILE.SET_PROFILE_INTRO,
  payload: introData,
});

const setProfileIntroSuccess = (introData: ProfileIntro): ProfileActions => ({
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

const setNotifications = (notifications: Notification[]): ProfileActions => ({
  type: PROFILE.SET_NOTIFICATIONS,
  payload: notifications,
});

const addFriend = (ids: AddFriendData): ProfileActions => ({
  type: PROFILE.ADD_FRIEND,
  payload: ids,
});

const addFriendSuccess = (friendId: string): ProfileActions => ({
  type: PROFILE.ADD_FRIEND_SUCCESS,
  payload: friendId,
});

const deleteFriend = (ids: {
  userId: string;
  friendId: string;
}): ProfileActions => ({
  type: PROFILE.DELETE_FRIEND,
  payload: ids,
});

const deleteFriendSuccess = (friendId: string): ProfileActions => ({
  type: PROFILE.DELETE_FRIEND_SUCCESS,
  payload: friendId,
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
  setNotifications,
  addFriend,
  addFriendSuccess,
  deleteFriend,
  deleteFriendSuccess,
};
