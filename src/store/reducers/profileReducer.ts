import { PROFILE } from '../constants';
import {
  ProfileState,
  ProfileIntro,
  ProfileActions,
  ProfileData,
} from '../types/profileTypes';

const initialState: ProfileState = {
  location: '',
  country: '',
  education: '',
  hobbies: '',
  loading: false,
  error: null,
};

const profileReducer = (
  state = initialState,
  { type, payload }: ProfileActions,
): ProfileState => {
  switch (type) {
    case PROFILE.SET_PROFILE_INTRO:
      return { ...state, loading: true };
    case PROFILE.SET_PROFILE_INTRO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...(payload as ProfileIntro),
      };
    case PROFILE.PROFILE_FAIL:
      return { ...state, loading: false, error: payload as string };
    case PROFILE.GET_PROFILE_DATA:
      return { ...state, loading: true };
    case PROFILE.GET_PROFILE_DATA_SUCCESS:
      return { ...state, loading: false, ...(payload as ProfileData) };
    default:
      return state;
  }
};

export default profileReducer;
