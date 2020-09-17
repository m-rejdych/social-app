import { all } from 'redux-saga/effects';

import { setSignIn, setSignUp } from './authSaga';

function* rootSaga() {
  yield all([setSignUp(), setSignIn()]);
}

export default rootSaga;
