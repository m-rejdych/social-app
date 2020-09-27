import { PROFILE } from '../constants';
import {
  ProfileState,
  ProfileIntro,
  ProfileActions,
  ProfileData,
  ProfileDetails,
} from '../types/profileTypes';

const initialState: ProfileState = {
  location: '',
  country: '',
  education: '',
  hobbies: '',
  dateOfBirth: '',
  proffesion: '',
  relationship: '',
  phoneNumber: '',
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
    case PROFILE.GET_PROFILE_DATA:
      return { ...state, loading: true };
    case PROFILE.GET_PROFILE_DATA_SUCCESS:
      return { ...state, loading: false, ...(payload as ProfileData) };
    case PROFILE.UPDATE_PROFILE_FIELD:
      return { ...state, loading: true };
    case PROFILE.UPDATE_PROFILE_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        ...(payload as Partial<ProfileDetails>),
      };
    case PROFILE.PROFILE_FAIL:
      return { ...state, loading: false, error: payload as string };
    default:
      return state;
  }
};

export default profileReducer;
