import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postsReducer from './postsReducer';
import { AuthState } from '../types/authTypes';
import { ProfileState } from '../types/profileTypes';
import { PostsState } from '../types/postsTypes';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
});

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  posts: PostsState;
}

export default rootReducer;
