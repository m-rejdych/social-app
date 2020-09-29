import { put, takeEvery } from 'redux-saga/effects';

import { VisitedProfileActions } from '../types/visitedProfileTypes';
import { VISITED_PROFILE } from '../constants';
import {
  getVisitedProfileDataSuccess,
  setVisitedProfileError,
} from '../actions';
import { db } from '../../firebase';

function* handleGetVisitedProfileData({ payload }: VisitedProfileActions) {
  try {
    const response = yield db
      .collection('users')
      .doc(payload as string)
      .get();
    yield put(getVisitedProfileDataSuccess(response.data()));
  } catch (error) {
    yield put(setVisitedProfileError(error.message));
  }
}

function* setGetVisitedProfileData() {
  yield takeEvery(
    VISITED_PROFILE.GET_VISITED_PROFILE_DATA,
    handleGetVisitedProfileData,
  );
}

export { setGetVisitedProfileData };
