import { combineReducers } from 'redux';
import { AuthState } from '../types/authTypes';

import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export interface RootState {
  auth: AuthState;
}

export default rootReducer;
