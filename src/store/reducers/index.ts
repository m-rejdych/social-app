import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import { AuthState } from '../types/authTypes';
import { ProfileState } from '../types/profileTypes';
import { PostsState } from '../types/postsTypes';
import { UsersState } from '../types/usersTypes';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  users: usersReducer,
});

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  posts: PostsState;
  usrs: UsersState;
}

export default rootReducer;
