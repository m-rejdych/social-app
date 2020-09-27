import { put, takeEvery } from 'redux-saga/effects';

import {
  sendPostSuccess,
  setPostsError,
  getPostsSuccess,
} from '../actions/postsActions';
import { PostsActions } from '../types/postsTypes';
import PostData from '../../types/PostData';
import { db } from '../../firebase';
import { POSTS } from '../constants';

function* handleSendPost({ payload }: PostsActions) {
  try {
    const { id } = payload as PostData;
    yield db
      .collection('posts')
      .doc(id)
      .set(payload as PostData);
    yield put(sendPostSuccess(payload as PostData));
  } catch (error) {
    yield put(setPostsError(payload as string));
  }
}

function* handleGetPosts({ payload }: PostsActions) {
  try {
    const posts: PostData[] = [];
    const response = yield db
      .collection('posts')
      .where('userId', '==', payload)
      .get();
    yield response.forEach((doc: { data: () => PostData }) => {
      posts.push(doc.data());
    });

    yield put(getPostsSuccess(posts));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* setSendPost() {
  yield takeEvery(POSTS.SEND_POST, handleSendPost);
}

function* setGetPosts() {
  yield takeEvery(POSTS.GET_POSTS, handleGetPosts);
}

export { setSendPost, setGetPosts };
