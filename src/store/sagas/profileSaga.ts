import { put, takeEvery, call } from 'redux-saga/effects';

import {
  ProfileActions,
  ProfileIntro,
  ProfileDetails,
  AddFriendData,
} from '../types/profileTypes';
import {
  setProfileError,
  setProfileIntroSuccess,
  updateProfileFieldSuccess,
  getProfileDataSuccess,
  addFriendSuccess,
  deleteFriendSuccess,
  deleteVisitedFriend,
} from '../actions';
import { deleteNotification } from '../../shared/interactions';
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

function* handleAddFriend({ payload }: ProfileActions) {
  try {
    const { notificationId, userId, friendId } = payload as AddFriendData;

    const userResponse = yield db.collection('users').doc(userId).get();
    const userFriends = userResponse.data().friends;
    yield db
      .collection('users')
      .doc(userId)
      .update({ friends: [...userFriends, friendId] });

    const friendResponse = yield db.collection('users').doc(friendId).get();
    const friendFriends = friendResponse.data().friends;
    yield db
      .collection('users')
      .doc(friendId)
      .update({ friends: [...friendFriends, userId] });
    yield call(deleteNotification, userId, notificationId);
    yield put(addFriendSuccess(friendId));
  } catch (error) {
    yield put(setProfileError(error.message));
  }
}

function* handleDeleteFriend({ payload }: ProfileActions) {
  try {
    const { userId, friendId } = payload as {
      userId: string;
      friendId: string;
    };
    const response = yield db.collection('users').doc(userId).get();
    const friends: string[] = response.data().friends;
    const updatedFriends = friends.filter((friend) => friend !== friendId);
    yield db
      .collection('users')
      .doc(userId)
      .update({ friends: updatedFriends });
    yield put(deleteFriendSuccess(friendId));
    yield put(deleteVisitedFriend({ userId: friendId, friendId: userId }));
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

function* setProfileFieldUpdate() {
  yield takeEvery(PROFILE.UPDATE_PROFILE_FIELD, handleUpdateProfileField);
}

function* setAddFriend() {
  yield takeEvery(PROFILE.ADD_FRIEND, handleAddFriend);
}

function* setDeleteFriend() {
  yield takeEvery(PROFILE.DELETE_FRIEND, handleDeleteFriend);
}

export {
  setProfileIntro,
  setProfileData,
  setProfileFieldUpdate,
  setAddFriend,
  setDeleteFriend,
};
