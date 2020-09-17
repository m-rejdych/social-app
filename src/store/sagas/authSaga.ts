import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

import { signInSuccess, signUpSuccess, setError } from '../actions';
import { AUTH } from '../constants';
import { Action } from '../types';
import { RequiredUserData, OptionalUserData } from '../types/authTypes';
import { auth } from '../../firebase';

function* signUpHandler({
  payload: { email, password, firstName, lastName },
}: Action<OptionalUserData>) {
  try {
    yield auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser!;
    user.updateProfile({ displayName: `${firstName} ${lastName}` });
    yield put(signUpSuccess({ email, firstName, lastName, userId: user.uid }));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* signInHandler({
  payload: { email, password },
}: Action<RequiredUserData>) {
  try {
    yield auth.signInWithEmailAndPassword(email, password);
    const { displayName, uid } = auth.currentUser!;
    const firstName = displayName!.slice(0, displayName!.indexOf(' '));
    const lastName = displayName!.slice(displayName!.indexOf(' ') + 1);
    yield put(signUpSuccess({ email, firstName, lastName, userId: uid }));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* setSignUp() {
  yield takeEvery(AUTH.SIGN_UP, signUpHandler);
}

function* setSignIn() {
  yield takeEvery(AUTH.SIGN_IN, signUpHandler);
}

export { setSignUp, setSignIn };
