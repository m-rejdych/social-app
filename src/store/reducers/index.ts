import { combineReducers } from 'redux';
import { AuthState } from '../types/authTypes';
import { ProfileState } from '../types/profileTypes';

import authReducer from './authReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
}

export default rootReducer;
