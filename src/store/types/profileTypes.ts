import { PROFILE } from '../constants';
import Notification from '../../types/Notificaiton';

export interface ProfileIntro {
  userId: string;
  location: string;
  country: string;
  education: string;
  hobbies: string;
}

export interface ProfileDetails {
  dateOfBirth: string;
  proffesion: string;
  relationship: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  friends: string[];
  notifications: Notification[];
}

export type ProfileData = ProfileIntro & ProfileDetails;

interface SetProfileIntroAction {
  type: typeof PROFILE.SET_PROFILE_INTRO;
  payload: ProfileIntro;
}

interface SetProfileIntroSuccessAction {
  type: typeof PROFILE.SET_PROFILE_INTRO_SUCCESS;
  payload: ProfileIntro;
}

interface GetProfileDataAction {
  type: typeof PROFILE.GET_PROFILE_DATA;
  payload: string;
}

interface GetProfileDataSuccessAction {
  type: typeof PROFILE.SET_PROFILE_INTRO_SUCCESS;
  payload: ProfileData;
}

interface UpdateProfileFieldAction {
  type: typeof PROFILE.UPDATE_PROFILE_FIELD;
  payload: { userId: string; fieldData: Partial<ProfileDetails> };
}

interface UpdateProfileFieldActionSuccess {
  type: typeof PROFILE.UPDATE_PROFILE_FIELD_SUCCESS;
  payload: Partial<ProfileDetails>;
}

interface SetNotificaitons {
  type: typeof PROFILE.SET_NOTIFICATIONS;
  payload: Notification[];
}

interface AddFriendAction {
  type: typeof PROFILE.ADD_FRIEND;
  payload: string;
}

interface AddFriendSuccessAction {
  type: typeof PROFILE.ADD_FRIEND_SUCCESS;
  payload: string;
}

interface SetProfileErrorAction {
  type: typeof PROFILE.PROFILE_FAIL;
  payload: string;
}

export interface ProfileState extends ProfileIntro, ProfileDetails {
  loading: boolean;
  error: null | string;
}

export type ProfileActions =
  | SetProfileIntroAction
  | SetProfileIntroSuccessAction
  | SetProfileErrorAction
  | GetProfileDataAction
  | GetProfileDataSuccessAction
  | UpdateProfileFieldAction
  | UpdateProfileFieldActionSuccess
  | SetNotificaitons
  | AddFriendAction
  | AddFriendSuccessAction;
