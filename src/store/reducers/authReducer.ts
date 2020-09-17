import { AuthState } from '../types/authTypes';
import { Action } from '../types';
import { AUTH } from '../constants';

const initialState: AuthState = {
  email: '',
  firstName: '',
  lastName: '',
  userId: '',
  loading: false,
  error: null,
};

const AuthReducer = (state = initialState, { type, payload }: Action<any>) => {
  switch (type) {
    case AUTH.AUTH:
      return { ...state, loading: true };
    case AUTH.AUTH_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null,
      };
    case AUTH.AUTH_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default AuthReducer;
