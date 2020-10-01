import { put, takeEvery, select } from 'redux-saga/effects';

import {
  ProfileActions,
  ProfileIntro,
  ProfileDetails,
} from '../types/profileTypes';
import {
  setProfileError,
  setProfileIntroSuccess,
  updateProfileFieldSuccess,
  getProfileDataSuccess,
  addFriendSuccess,
} from '../actions';
import { RootState } from '../reducers';
import { PROFILE } from '../constants';
import { db } from '../../firebase';

function* handleSetProfileIntro({ payload }: ProfileActions) {
  try {
    const { userId } = payload as ProfileIntro;
    yield db
      .collection('users')
      .doc(userId)
      .update(payload as ProfileIntro);
    yield put(setProfileIntroSuccess(payload as ProfileIntro));
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

function* handleUpdateProfileField({ payload }: ProfileActions) {
  try {
    const { userId, fieldData } = payload as {
      userId: string;
      fieldData: Partial<ProfileDetails>;
    };
    yield db.collection('users').doc(userId).update(fieldData);
    yield put(updateProfileFieldSuccess(fieldData));
  } catch (error) {
    yield put(setProfileError(error.message));
  }
}

// function* handleAddFriend({ payload }: ProfileActions) {
//   try {
//     const userId = yield select((state: RootState) => state.auth.userId);
//     yield db.collection('users').doc(userId)
//   }
// }

function* setProfileIntro() {
  yield takeEvery(PROFILE.SET_PROFILE_INTRO, handleSetProfileIntro);
}

function* setProfileData() {
  yield takeEvery(PROFILE.GET_PROFILE_DATA, handleGetProfileData);
}

function* setProfileFieldUpdate() {
  yield takeEvery(PROFILE.UPDATE_PROFILE_FIELD, handleUpdateProfileField);
}

export { setProfileIntro, setProfileData, setProfileFieldUpdate };
