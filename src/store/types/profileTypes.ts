import { PROFILE } from '../constants';

export interface ProfileIntro {
  location: string;
  country: string;
  education: string;
  hobbies: string;
}

interface SetProfileIntroAction {
  type: typeof PROFILE.SET_PROFILE_INTRO;
  payload: ProfileIntro;
}

interface SetProfileIntroSuccessAction {
  type: typeof PROFILE.SET_PROFILE_INTRO_SUCCESS;
  payload: ProfileIntro;
}

interface SetProfileErrorAction {
  type: typeof PROFILE.PROFILE_FAIL;
  payload: string;
}

export interface ProfileState extends ProfileIntro {
  loading: boolean;
  error: null | string;
}

export type ProfileActions =
  | SetProfileIntroAction
  | SetProfileIntroSuccessAction
  | SetProfileErrorAction;
