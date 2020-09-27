import { all } from 'redux-saga/effects';

import { setSignIn, setSignUp } from './authSaga';
import {
  setProfileIntro,
  setProfileData,
  setProfileFieldUpdate,
} from './profileSaga';
import { setSendPost, setGetPosts } from './postsSaga';

function* rootSaga() {
  yield all([
    setSignUp(),
    setSignIn(),
    setProfileIntro(),
    setProfileData(),
    setProfileFieldUpdate(),
    setSendPost(),
    setGetPosts(),
  ]);
}

export default rootSaga;
