import { PROFILE } from '../constants';
import { ProfileActions, ProfileIntro } from '../types/profileTypes';

const setProfileIntro = (introData: ProfileIntro): ProfileActions => ({
  type: PROFILE.SET_PROFILE_INTRO,
  payload: introData,
});

const setProfileIntroSuccess = (introData: ProfileIntro) => ({
  type: PROFILE.SET_PROFILE_INTRO_SUCCESS,
  payload: introData,
});

const setProfileError = (error: string): ProfileActions => ({
  type: PROFILE.PROFILE_FAIL,
  payload: error,
});

export { setProfileIntro, setProfileIntroSuccess, setProfileError };
