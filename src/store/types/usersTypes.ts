import { USERS } from '../constants';

export interface User {
  firstName: string;
  lastName: string;
  userId: string;
}

interface GetUsersAction {
  type: typeof USERS.GET_USERS;
  payload: null;
}

interface GetUserSuccessAction {
  type: typeof USERS.GET_USERS_SUCCESS;
  payload: User[];
}

interface SetUsersError {
  type: typeof USERS.USERS_FAIL;
  payload: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: null | string;
}

export type UsersActions =
  | GetUsersAction
  | GetUserSuccessAction
  | SetUsersError;
