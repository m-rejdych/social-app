import { all } from 'redux-saga/effects';

import { setSignIn, setSignUp } from './authSaga';
import { setProfileIntro } from './profileSagas';

function* rootSaga() {
  yield all([setSignUp(), setSignIn(), setProfileIntro()]);
}

export default rootSaga;
