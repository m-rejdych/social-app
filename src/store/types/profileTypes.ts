import { PROFILE } from '../constants';
import Notification from '../../types/Notificaiton';
import Message from '../../types/Message';

export interface ProfileIntro {
  userId: string;
  location: string;
  country: string;
  education: string;
  hobbies: string;
}

export interface Friend {
  firstName: string;
  lastName: string;
  userId: string;
}

export interface Messages {
  [userId: string]: Message[];
}

export interface ProfileDetails {
  dateOfBirth: string;
  proffesion: string;
  relationship: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  friends: Friend[];
  notifications: Notification[];
  messages: Messages;
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

interface SetFriendsAction {
  type: typeof PROFILE.SET_FRIENDS;
  payload: Friend[];
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

interface SetMessages {
  type: typeof PROFILE.SET_MESSAGES;
  payload: Messages;
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
  | SetFriendsAction
  | GetProfileDataAction
  | GetProfileDataSuccessAction
  | UpdateProfileFieldAction
  | UpdateProfileFieldActionSuccess
  | SetMessages
  | SetNotificaitons;
