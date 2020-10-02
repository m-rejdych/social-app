import { all } from 'redux-saga/effects';

import { setSignIn, setSignUp } from './authSaga';
import {
  setProfileIntro,
  setProfileData,
  setProfileFieldUpdate,
  setAddFriend,
} from './profileSaga';
import { setGetVisitedProfileData } from './visitedProfileSaga';
import { setSendPost, setGetPosts } from './postsSaga';
import { setGetUsers } from './usersSaga';

function* rootSaga() {
  yield all([
    setSignUp(),
    setSignIn(),
    setProfileIntro(),
    setProfileData(),
    setProfileFieldUpdate(),
    setAddFriend(),
    setGetVisitedProfileData(),
    setSendPost(),
    setGetPosts(),
    setGetUsers(),
  ]);
}

export default rootSaga;
