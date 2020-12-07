import { USERS } from '../constants';
import { UsersState, User, UsersActions } from '../types/usersTypes';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersReducer = (
  state = initialState,
  { type, payload }: UsersActions,
): UsersState => {
  switch (type) {
    case USERS.GET_USERS:
      return { ...state, loading: true };
    case USERS.GET_USERS_SUCCESS:
      return { ...state, loading: false, users: payload as User[] };
    case USERS.USERS_FAIL:
      return { ...state, loading: false, error: payload as string };
    default:
      return state;
  }
};

export default usersReducer;
