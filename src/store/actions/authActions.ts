import { AUTH } from '../constants';
import { Action } from '../types';
import { Auth, RequiredUserData, OptionalUserData } from '../types/authTypes';

const signUp = (userData: OptionalUserData): Action<OptionalUserData> => ({
  type: AUTH.SIGN_UP,
  payload: userData,
});

const signIn = (userData: RequiredUserData): Action<RequiredUserData> => ({
  type: AUTH.SIGN_UP,
  payload: userData,
});

const signUpSuccess = (userData: Auth): Action<Auth> => ({
  type: AUTH.SIGN_UP,
  payload: userData,
});

const signInSuccess = (userData: Auth): Action<Auth> => ({
  type: AUTH.SIGN_UP,
  payload: userData,
});

const setError = (error: string): Action<string> => ({
  type: AUTH.AUTH_FAIL,
  payload: error,
});

export { signUp, signIn, signInSuccess, signUpSuccess, setError };
