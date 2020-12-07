import { put, takeEvery } from 'redux-saga/effects';

import { VisitedProfileActions } from '../types/visitedProfileTypes';
import { VISITED_PROFILE } from '../constants';
import {
  getVisitedProfileDataSuccess,
  setVisitedProfileError,
  deleteVisitedFriendSuccess,
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

function* handleDeleteVisitedFriend({ payload }: VisitedProfileActions) {
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
    yield put(deleteVisitedFriendSuccess(friendId));
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

function* setDeleteVisitedFriend() {
  yield takeEvery(
    VISITED_PROFILE.DELETE_VISITED_FRIEND,
    handleDeleteVisitedFriend,
  );
}

export { setGetVisitedProfileData, setDeleteVisitedFriend };
