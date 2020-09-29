import { put, takeEvery } from 'redux-saga/effects';

import { UsersActions, User } from '../types/usersTypes';
import { getUsersSuccess, setUsersError } from '../actions';
import { USERS } from '../constants';
import { db } from '../../firebase';

function* handleGetUsers() {
  try {
    const users: User[] = [];
    const response = yield db.collection('users').get();
    response.forEach((doc: { id: string; data: () => User }) => {
      const { firstName, lastName } = doc.data();
      users.push({ userId: doc.id, firstName, lastName });
    });
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(setUsersError(error.message));
  }
}

function* setGetUsers() {
  yield takeEvery(USERS.GET_USERS, handleGetUsers);
}

export { setGetUsers };
