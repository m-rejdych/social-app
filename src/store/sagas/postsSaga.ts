import { put, takeEvery } from 'redux-saga/effects';

import {
  sendPostSuccess,
  deletePostSuccess,
  setPostsError,
  getPostsSuccess,
  likePostSuccess,
  dislikePostSuccess,
  commentSuccess,
  deleteCommentSuccess,
  likeCommentSuccess,
  dislikeCommentSuccess,
} from '../actions/postsActions';
import {
  PostsActions,
  LikeDislikeData,
  CommentData,
  DeleteCommentData,
  LikeDislikeCommentData,
} from '../types/postsTypes';
import PostData from '../../types/PostData';
import Comment from '../../types/Comment';
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

function* handleLikePost({ payload }: PostsActions) {
  try {
    const { id, userId } = payload as LikeDislikeData;
    const postResponse = yield db.collection('posts').doc(id).get();
    const likes: string[] = postResponse.data().likes;
    const updatedLikes = [...likes, userId];
    yield db.collection('posts').doc(id).update({ likes: updatedLikes });
    yield put(likePostSuccess({ id, likes: updatedLikes }));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleDislikePost({ payload }: PostsActions) {
  try {
    const { id, userId } = payload as LikeDislikeData;
    const postResponse = yield db.collection('posts').doc(id).get();
    const likes: string[] = postResponse.data().likes;
    const updatedLikes = likes.filter(
      (likingUserId) => likingUserId !== userId,
    );
    yield db.collection('posts').doc(id).update({ likes: updatedLikes });
    yield put(dislikePostSuccess({ id, likes: updatedLikes }));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleComment({ payload }: PostsActions) {
  try {
    const { postId, comment } = payload as CommentData;
    const postResponse = yield db.collection('posts').doc(postId).get();
    const comments: Comment[] = postResponse.data().comments;
    const updatedComments = [...comments, comment];
    yield db
      .collection('posts')
      .doc(postId)
      .update({ comments: updatedComments });
    yield put(commentSuccess({ postId, comments: updatedComments }));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleDeleteComment({ payload }: PostsActions) {
  try {
    const { postId, commentId } = payload as DeleteCommentData;
    const postResponse = yield db.collection('posts').doc(postId).get();
    const comments: Comment[] = postResponse.data().comments;
    const updatedComments = comments.filter(({ id }) => id !== commentId);
    yield db
      .collection('posts')
      .doc(postId)
      .update({ comments: updatedComments });
    yield put(deleteCommentSuccess({ postId, comments: updatedComments }));
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleLikeComment({ payload }: PostsActions) {
  try {
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
  } catch (error) {
    yield put(setPostsError(error.message));
  }
}

function* handleDislikeComment({ payload }: PostsActions) {
  try {
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
  setLikePost,
  setDislikePost,
  setComment,
  setDeleteComment,
  setLikeComment,
  setDislikeComment,
};
