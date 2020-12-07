import { all } from 'redux-saga/effects';

import { setSignIn, setSignUp } from './authSaga';
import {
  setProfileIntro,
  setProfileData,
  setProfileFieldUpdate,
} from './profileSaga';
import {
  setGetVisitedProfileData,
  setDeleteVisitedFriend,
} from './visitedProfileSaga';
import {
  setSendPost,
  setDeletePost,
  setGetPosts,
  setGetPost,
  setLikePost,
  setDislikePost,
  setComment,
  setDeleteComment,
  setLikeComment,
  setDislikeComment,
} from './postsSaga';
import { setGetUsers } from './usersSaga';

function* rootSaga() {
  yield all([
    setSignUp(),
    setSignIn(),
    setProfileIntro(),
    setProfileData(),
    setProfileFieldUpdate(),
    setGetVisitedProfileData(),
    setDeleteVisitedFriend(),
    setSendPost(),
    setDeletePost(),
    setGetPosts(),
    setGetPost(),
    setLikePost(),
    setDislikePost(),
    setComment(),
    setDeleteComment(),
    setLikeComment(),
    setDislikeComment(),
    setGetUsers(),
  ]);
}

export default rootSaga;
