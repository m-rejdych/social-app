import { put, takeEvery } from 'redux-saga/effects';

import {
  ProfileActions,
  ProfileIntro,
  ProfileData,
} from '../types/profileTypes';
import {
  setProfileError,
  setProfileIntroSuccess,
  getProfileDataSuccess,
} from '../actions';
import { PROFILE } from '../constants';
import { db } from '../../firebase';

function* handleSetProfileIntro({ payload }: ProfileActions) {
  try {
    const { userId, ...rest } = payload as ProfileIntro;
    yield db.collection('users').doc(userId).update(rest);
    yield put(setProfileIntroSuccess(rest));
  } catch (error) {
    yield put(setProfileError(error.message));
  }
}

function* handleGetProfileData({ payload }: ProfileActions) {
  try {
    const response = yield db
      .collection('users')
      .doc(payload as string)
      .get();
    yield put(getProfileDataSuccess(response.data()));
  } catch (error) {
    yield put(setProfileError(error.message));
  }
}

function* setProfileIntro() {
  yield takeEvery(PROFILE.SET_PROFILE_INTRO, handleSetProfileIntro);
}

function* setProfileData() {
  yield takeEvery(PROFILE.GET_PROFILE_DATA, handleGetProfileData);
}

export { setProfileIntro, setProfileData };
