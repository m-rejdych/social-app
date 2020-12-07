import { USERS } from '../constants';
import { UsersActions, User } from '../types/usersTypes';

const getUsers = (): UsersActions => ({
  type: USERS.GET_USERS,
  payload: null,
});

const getUsersSuccess = (users: User[]): UsersActions => ({
  type: USERS.GET_USERS_SUCCESS,
  payload: users,
});

const setUsersError = (error: string): UsersActions => ({
  type: USERS.USERS_FAIL,
  payload: error,
});

export { getUsers, getUsersSuccess, setUsersError };
