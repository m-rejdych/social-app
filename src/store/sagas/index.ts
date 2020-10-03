import { all } from 'redux-saga/effects';

import { setSignIn, setSignUp } from './authSaga';
import {
  setProfileIntro,
  setProfileData,
  setProfileFieldUpdate,
  setAddFriend,
  setDeleteFriend,
} from './profileSaga';
import {
  setGetVisitedProfileData,
  setDeleteVisitedFriend,
} from './visitedProfileSaga';
import {
  setSendPost,
  setDeletePost,
  setGetPosts,
  setLikePost,
  setDislikePost,
  setComment,
  setDeleteComment,
} from './postsSaga';
import { setGetUsers } from './usersSaga';

function* rootSaga() {
  yield all([
    setSignUp(),
    setSignIn(),
    setProfileIntro(),
    setProfileData(),
    setProfileFieldUpdate(),
    setAddFriend(),
    setDeleteFriend(),
    setGetVisitedProfileData(),
    setDeleteVisitedFriend(),
    setSendPost(),
    setDeletePost(),
    setGetPosts(),
    setLikePost(),
    setDislikePost(),
    setComment(),
    setDeleteComment(),
    setGetUsers(),
  ]);
}

export default rootSaga;
