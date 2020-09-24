import { all } from 'redux-saga/effects';

import { setSignIn, setSignUp } from './authSaga';
import { setProfileIntro, setProfileData } from './profileSagas';

function* rootSaga() {
  yield all([setSignUp(), setSignIn(), setProfileIntro(), setProfileData()]);
}

export default rootSaga;
