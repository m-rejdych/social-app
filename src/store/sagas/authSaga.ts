import { put, takeEvery } from 'redux-saga/effects';
import { signInSuccess, signUpSuccess, setProfileError } from '../actions';
import { AUTH } from '../constants';
import { RequiredUserData, AdditionalUserData } from '../types/authTypes';
import { auth, db, Persistence } from '../../firebase';

interface Action<T> {
  type: string;
  payload: T;
}

function* handleSignUp({
  payload: { email, password, firstName, lastName },
}: Action<AdditionalUserData>) {
  try {
    yield auth.setPersistence(Persistence.SESSION);
    yield auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser!;
    user.updateProfile({ displayName: `${firstName} ${lastName}` });
    yield put(signUpSuccess({ email, firstName, lastName, userId: user.uid }));
    yield db
      .collection('users')
      .doc(user.uid)
      .set({
        email,
        firstName,
        lastName,
        location: 'No location information',
        country: 'No country information',
        education: 'No education information',
        hobbies: 'No hobbies information',
        dateOfBirth: 'No age information',
        proffesion: 'No proffesion information',
        relationship: 'No relationship information',
        phoneNumber: 'No phone number information',
      });
  } catch (error) {
    yield put(setProfileError(error.message));
  }
}

function* handleSignIn({
  payload: { email, password },
}: Action<RequiredUserData>) {
  try {
    yield auth.setPersistence(Persistence.SESSION);
    yield auth.signInWithEmailAndPassword(email, password);
    const { displayName, uid } = auth.currentUser!;
    const firstName = displayName!.slice(0, displayName!.indexOf(' '));
    const lastName = displayName!.slice(displayName!.indexOf(' ') + 1);
    yield put(signInSuccess({ email, firstName, lastName, userId: uid }));
  } catch (error) {
    yield put(setProfileError(error.message));
  }
}

function* setSignUp() {
  yield takeEvery(AUTH.SIGN_UP, handleSignUp);
}

function* setSignIn() {
  yield takeEvery(AUTH.SIGN_IN, handleSignIn);
}

export { setSignUp, setSignIn };
