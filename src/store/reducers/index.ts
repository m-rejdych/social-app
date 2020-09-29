import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import visitedProfileReducer from './visitedProfileReducer';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import { AuthState } from '../types/authTypes';
import { ProfileState } from '../types/profileTypes';
import { VisitedProfileState } from '../types/visitedProfileTypes';
import { PostsState } from '../types/postsTypes';
import { UsersState } from '../types/usersTypes';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  visitedProfile: visitedProfileReducer,
  posts: postsReducer,
  users: usersReducer,
});

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  visitedProfile: VisitedProfileState;
  posts: PostsState;
  users: UsersState;
}

export default rootReducer;
