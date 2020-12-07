import { put, takeEvery, select } from 'redux-saga/effects';

import {
  sendPostSuccess,
  deletePostSuccess,
  setPostsError,
  getPostsSuccess,
  getPostSuccess,
  likePostSuccess,
  dislikePostSuccess,
  commentSuccess,
  deleteCommentSuccess,
  likeCommentSuccess,
  dislikeCommentSuccess,
} from '../actions';
import {
  PostsActions,
  LikeDislikeData,
  CommentData,
  DeleteCommentData,
  LikeDislikeCommentData,
} from '../types/postsTypes';
import { db } from '../../firebase';
import { POSTS } from '../constants';
import { RootState } from '../reducers';
import PostData from '../../types/PostData';
import Comment from '../../types/Comment';

function* handleSendPost({ payload }: PostsActions) {
  try {
    const { id } = payload as PostData;
    yield db
      .collection('posts')
      .doc(id)
      .set(payload as PostData);
    yield put(sendPostSuccess(payload as PostData));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleDeletePost({ payload }: PostsActions) {
  try {
    yield db
      .collection('posts')
      .doc(payload as string)
      .delete();
    yield put(deletePostSuccess(payload as string));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleGetPosts({ payload }: PostsActions) {
  try {
    const posts: PostData[] = [];
    const response = yield db.collection('posts').get();
    yield response.forEach((doc: { data: () => PostData }) => {
      const comments: Comment[] = doc
        .data()
        .comments.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
      posts.push({ ...doc.data(), comments });
    });
    const result = posts
      .filter(({ userId }) => (payload as string[]).includes(userId))
      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));

    yield put(getPostsSuccess(result));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleGetPost({ payload }: PostsActions) {
  try {
    const response = yield db
      .collection('posts')
      .doc(payload as string)
      .get();
    const postData = response.data();
    yield put(getPostSuccess(postData));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleLikePost({ payload }: PostsActions) {
  try {
    const currentPost: PostData = yield select(
      (state: RootState) => state.posts.currentPost,
    );
    const { id, userId } = payload as LikeDislikeData;
    const postResponse = yield db.collection('posts').doc(id).get();
    const likes: string[] = postResponse.data().likes;
    const updatedLikes = [...likes, userId];
    yield db.collection('posts').doc(id).update({ likes: updatedLikes });
    yield put(likePostSuccess({ id, likes: updatedLikes }));
    if (currentPost.id === id)
      yield put(
        getPostSuccess({ ...postResponse.data(), likes: updatedLikes }),
      );
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleDislikePost({ payload }: PostsActions) {
  try {
    const currentPost: PostData = yield select(
      (state: RootState) => state.posts.currentPost,
    );
    const { id, userId } = payload as LikeDislikeData;
    const postResponse = yield db.collection('posts').doc(id).get();
    const likes: string[] = postResponse.data().likes;
    const updatedLikes = likes.filter(
      (likingUserId) => likingUserId !== userId,
    );
    yield db.collection('posts').doc(id).update({ likes: updatedLikes });
    yield put(dislikePostSuccess({ id, likes: updatedLikes }));
    if (currentPost.id === id)
      yield put(
        getPostSuccess({ ...postResponse.data(), likes: updatedLikes }),
      );
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleComment({ payload }: PostsActions) {
  try {
    const currentPost: PostData = yield select(
      (state: RootState) => state.posts.currentPost,
    );
    const { postId, comment } = payload as CommentData;
    const postResponse = yield db.collection('posts').doc(postId).get();
    const comments: Comment[] = postResponse.data().comments;
    const updatedComments = [comment, ...comments];
    yield db
      .collection('posts')
      .doc(postId)
      .update({ comments: updatedComments });
    yield put(commentSuccess({ postId, comments: updatedComments }));
    if (currentPost.id === postId)
      yield put(
        getPostSuccess({ ...postResponse.data(), comments: updatedComments }),
      );
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleDeleteComment({ payload }: PostsActions) {
  try {
    const currentPost: PostData = yield select(
      (state: RootState) => state.posts.currentPost,
    );
    const { postId, commentId } = payload as DeleteCommentData;
    const postResponse = yield db.collection('posts').doc(postId).get();
    const comments: Comment[] = postResponse.data().comments;
    const updatedComments = comments.filter(({ id }) => id !== commentId);
    yield db
      .collection('posts')
      .doc(postId)
      .update({ comments: updatedComments });
    yield put(deleteCommentSuccess({ postId, comments: updatedComments }));
    if (currentPost.id === postId)
      yield put(getPostSuccess({ ...postResponse, comments: updatedComments }));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleLikeComment({ payload }: PostsActions) {
  try {
    const currentPost: PostData = yield select(
      (state: RootState) => state.posts.currentPost,
    );
    const { postId, commentId, userId } = payload as LikeDislikeCommentData;
    const postResponse = yield db.collection('posts').doc(postId).get();
    const comments: Comment[] = postResponse.data().comments;
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, likes: [...comment.likes, userId] }
        : comment,
    );
    yield db
      .collection('posts')
      .doc(postId)
      .update({ comments: updatedComments });
    yield put(likeCommentSuccess({ postId, comments: updatedComments }));
    if (currentPost.id === postId)
      yield put(
        getPostSuccess({ ...postResponse.data(), comments: updatedComments }),
      );
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleDislikeComment({ payload }: PostsActions) {
  try {
    const currentPost: PostData = yield select(
      (state: RootState) => state.posts.currentPost,
    );
    const { postId, commentId, userId } = payload as LikeDislikeCommentData;
    const postResponse = yield db.collection('posts').doc(postId).get();
    const comments: Comment[] = postResponse.data().comments;
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes.filter((id) => id !== userId) }
        : comment,
    );
    yield db
      .collection('posts')
      .doc(postId)
      .update({ comments: updatedComments });
    yield put(dislikeCommentSuccess({ postId, comments: updatedComments }));
    if (currentPost.id === postId)
      yield put(
        getPostSuccess({ ...postResponse.data(), comments: updatedComments }),
      );
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* setSendPost() {
  yield takeEvery(POSTS.SEND_POST, handleSendPost);
}

function* setDeletePost() {
  yield takeEvery(POSTS.DELETE_POST, handleDeletePost);
}

function* setGetPosts() {
  yield takeEvery(POSTS.GET_POSTS, handleGetPosts);
}

function* setGetPost() {
  yield takeEvery(POSTS.GET_POST, handleGetPost);
}

function* setLikePost() {
  yield takeEvery(POSTS.LIKE_POST, handleLikePost);
}

function* setDislikePost() {
  yield takeEvery(POSTS.DISLIKE_POST, handleDislikePost);
}

function* setComment() {
  yield takeEvery(POSTS.COMMENT, handleComment);
}

function* setDeleteComment() {
  yield takeEvery(POSTS.DELETE_COMMENT, handleDeleteComment);
}

function* setLikeComment() {
  yield takeEvery(POSTS.LIKE_COMMENT, handleLikeComment);
}

function* setDislikeComment() {
  yield takeEvery(POSTS.DISLIKE_COMMENT, handleDislikeComment);
}

export {
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
};
