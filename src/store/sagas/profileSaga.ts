import { put, takeEvery, select } from 'redux-saga/effects';

import {
  ProfileActions,
  ProfileIntro,
  ProfileDetails,
  Notification,
} from '../types/profileTypes';
import {
  setProfileError,
  setProfileIntroSuccess,
  updateProfileFieldSuccess,
  getProfileDataSuccess,
  sendNotification,
  addFriendSuccess,
} from '../actions';
import { RootState } from '../reducers';
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

function* handleSendNotificaiton({ payload }: ProfileActions) {
  try {
    const { fromUserId, toUserId, from, type } = payload as Notification;
    const response = yield db.collection('users').doc(toUserId).get();
    const notifications: Notification[] = [
      ...response.data().notifications,
      { fromUserId, from, type },
    ];
    yield db.collection('users').doc(toUserId).update({ notifications });
  } catch (error) {
    yield put(setProfileError(error));
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

function* setSendNotification() {
  yield takeEvery(PROFILE.SEND_NOTIFICATION, handleSendNotificaiton);
}

export {
  setProfileIntro,
  setProfileData,
  setProfileFieldUpdate,
  setSendNotification,
};
