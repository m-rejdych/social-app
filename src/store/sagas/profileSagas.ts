import { put, takeEvery } from 'redux-saga/effects';

import { ProfileActions, ProfileIntro } from '../types/profileTypes';
import { setProfileError, setProfileIntroSuccess } from '../actions';
import { PROFILE } from '../constants';
import { db } from '../../firebase';

function* handleSetProfileIntro({ payload }: ProfileActions) {}

function* setProfileIntro() {
  yield takeEvery(PROFILE.SET_PROFILE_INTRO, handleSetProfileIntro);
}

export { setProfileIntro };
