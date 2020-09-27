import { PROFILE } from '../constants';
import { AdditionalUserData } from './authTypes';

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
}

export type ProfileData = ProfileIntro &
  ProfileDetails &
  Omit<AdditionalUserData, 'password'>;

interface SetProfileIntroAction {
  type: typeof PROFILE.SET_PROFILE_INTRO;
  payload: ProfileIntro;
}

interface SetProfileIntroSuccessAction {
  type: typeof PROFILE.SET_PROFILE_INTRO_SUCCESS;
  payload: Omit<ProfileIntro, 'userId'>;
}

interface GetProfileDataAction {
  type: typeof PROFILE.GET_PROFILE_DATA;
  payload: string;
}

interface GetProfileDataSuccessAction {
  type: typeof PROFILE.SET_PROFILE_INTRO_SUCCESS;
  payload: ProfileData;
}

interface SetProfileErrorAction {
  type: typeof PROFILE.PROFILE_FAIL;
  payload: string;
}

interface UpdateProfileFieldAction {
  type: typeof PROFILE.UPDATE_PROFILE_FIELD;
  payload: { userId: string; fieldData: Partial<ProfileDetails> };
}

interface UpdateProfileFieldActionSuccess {
  type: typeof PROFILE.UPDATE_PROFILE_FIELD_SUCCESS;
  payload: Partial<ProfileDetails>;
}

export interface ProfileState
  extends Omit<ProfileIntro, 'userId'>,
    ProfileDetails {
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
  | UpdateProfileFieldActionSuccess;
