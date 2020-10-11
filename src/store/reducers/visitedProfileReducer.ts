import { VISITED_PROFILE } from '../constants';
import {
  VisitedProfileActions,
  VisitedProfileState,
} from '../types/visitedProfileTypes';
import { ProfileData } from '../types/profileTypes';

const initialState: VisitedProfileState = {
  email: '',
  firstName: '',
  lastName: '',
  userId: '',
  location: '',
  country: '',
  education: '',
  hobbies: '',
  dateOfBirth: '',
  proffesion: '',
  relationship: '',
  phoneNumber: '',
  friends: [],
  notifications: [],
  messages: {},
  loading: true,
  error: null,
};

const visitedProfileReducer = (
  state = initialState,
  { type, payload }: VisitedProfileActions,
): VisitedProfileState => {
  switch (type) {
    case VISITED_PROFILE.GET_VISITED_PROFILE_DATA:
      return { ...state, loading: true };
    case VISITED_PROFILE.GET_VISITED_PROFILE_DATA_SUCCESS:
      return { ...state, loading: false, ...(payload as ProfileData) };
    case VISITED_PROFILE.DELETE_VISITED_FRIEND:
      return { ...state, loading: true };
    case VISITED_PROFILE.DELETE_VISITED_FRIEND_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: state.friends.filter((friendId) => friendId !== payload),
      };
    case VISITED_PROFILE.VISITED_PROFILE_FAIL:
      return { ...state, loading: false, error: payload as string };
    default:
      return state;
  }
};

export default visitedProfileReducer;
