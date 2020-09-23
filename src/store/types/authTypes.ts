import { AUTH } from '../constants';

// export interface Auth {
//   email: string;
//   firstName: string;
//   lastName: string;
//   userId: string;
// }

// export interface RequiredUserData {
//   email: string;
//   password: string;
// }

// export interface OptionalUserData extends RequiredUserData {
//   firstName: string;
//   lastName: string;
// }

export interface RequiredUserData {
  email: string;
  password: string;
}

export interface AdditionalUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Auth {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
}

export type Error = string | null;

export type UserData = RequiredUserData | AdditionalUserData;

interface SignUpAction {
  type: typeof AUTH.SIGN_UP;
  payload: UserData;
}

interface SignInAction {
  type: typeof AUTH.SIGN_IN;
  payload: UserData;
}

interface SignUpSuccessAction {
  type: typeof AUTH.SIGN_UP_SUCCESS;
  payload: Auth;
}

interface SignInSuccessAction {
  type: typeof AUTH.SIGN_IN_SUCCESS;
  payload: Auth;
}

interface SetAuthErrorAction {
  type: typeof AUTH.FAIL;
  payload: Error;
}

interface LoadUserAction {
  type: typeof AUTH.LOAD_USER;
  payload: Auth;
}

interface ResetErrorAction {
  type: typeof AUTH.RESET_ERROR;
  payload: null;
}

export interface AuthState {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  loading: boolean;
  error: string | null;
}

export type AuthActions =
  | SignUpAction
  | SignInAction
  | SignUpSuccessAction
  | SignInSuccessAction
  | SetAuthErrorAction
  | LoadUserAction
  | ResetErrorAction;
