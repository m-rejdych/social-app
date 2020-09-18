import { AuthState, AuthActions, Auth } from '../types/authTypes';
import { AUTH } from '../constants';

const initialState: AuthState = {
  email: '',
  firstName: '',
  lastName: '',
  userId: '',
  loading: false,
  error: null,
};

const AuthReducer = (state = initialState, { type, payload }: AuthActions) => {
  switch (type) {
    case AUTH.SIGN_UP:
      return { ...state, loading: true };
    case AUTH.SIGN_UP_SUCCESS:
      return { ...state, loading: false, error: null, ...(payload as Auth) };
    case AUTH.SIGN_IN:
      return { ...state, loading: true };
    case AUTH.SIGN_IN_SUCCESS:
      return { ...state, loading: false, error: null, ...(payload as Auth) };
    case AUTH.AUTH_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default AuthReducer;
