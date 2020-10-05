import PostData from '../../types/PostData';
import { POSTS } from '../constants';
import {
  PostsActions,
  LikeDislikeData,
  LikeDislikeSuccessData,
  CommentData,
  CommentSuccessData,
  DeleteCommentData,
  DeleteCommentSuccessData,
  LikeDislikeCommentData,
} from '../types/postsTypes';

const sendPost = (postData: PostData): PostsActions => ({
  type: POSTS.SEND_POST,
  payload: postData,
});

const sendPostSuccess = (postData: PostData): PostsActions => ({
  type: POSTS.SEND_POST_SUCCESS,
  payload: postData,
});

const deletePost = (postId: string): PostsActions => ({
  type: POSTS.DELETE_POST,
  payload: postId,
});

const deletePostSuccess = (postId: string): PostsActions => ({
  type: POSTS.DELETE_POST_SUCCESS,
  payload: postId,
});

const getPosts = (userId: string): PostsActions => ({
  type: POSTS.GET_POSTS,
  payload: userId,
});

const getPostsSuccess = (fetchedPosts: PostData[]): PostsActions => ({
  type: POSTS.GET_POSTS_SUCCESS,
  payload: fetchedPosts,
});

const likePost = (likeData: LikeDislikeData): PostsActions => ({
  type: POSTS.LIKE_POST,
  payload: likeData,
});

const likePostSuccess = (likesData: LikeDislikeSuccessData): PostsActions => ({
  type: POSTS.LIKE_POST_SUCCESS,
  payload: likesData,
});

const dislikePost = (dislikeData: LikeDislikeData): PostsActions => ({
  type: POSTS.DISLIKE_POST,
  payload: dislikeData,
});

const dislikePostSuccess = (
  likesData: LikeDislikeSuccessData,
): PostsActions => ({
  type: POSTS.DISLIKE_POST_SUCCESS,
  payload: likesData,
});

const comment = (commentData: CommentData): PostsActions => ({
  type: POSTS.COMMENT,
  payload: commentData,
});

const commentSuccess = (commentData: CommentSuccessData): PostsActions => ({
  type: POSTS.COMMENT_SUCCESS,
  payload: commentData,
});

const deleteComment = (commentData: DeleteCommentData): PostsActions => ({
  type: POSTS.DELETE_COMMENT,
  payload: commentData,
});

const deleteCommentSuccess = (
  commentsData: DeleteCommentSuccessData,
): PostsActions => ({
  type: POSTS.DELETE_COMMENT_SUCCESS,
  payload: commentsData,
});

const likeComment = (commentData: LikeDislikeCommentData): PostsActions => ({
  type: POSTS.LIKE_COMMENT,
  payload: commentData,
});

const likeCommentSuccess = (
  commentsData: CommentSuccessData,
): PostsActions => ({
  type: POSTS.LIKE_COMMENT_SUCCESS,
  payload: commentsData,
});

const dislikeComment = (commentData: LikeDislikeCommentData): PostsActions => ({
  type: POSTS.DISLIKE_COMMENT,
  payload: commentData,
});

const dislikeCommentSuccess = (
  commentsData: CommentSuccessData,
): PostsActions => ({
  type: POSTS.DISLIKE_COMMENT_SUCCESS,
  payload: commentsData,
});

const setPostsError = (error: string): PostsActions => ({
  type: POSTS.POSTS_FAIL,
  payload: error,
});

export {
  sendPost,
  sendPostSuccess,
  deletePost,
  deletePostSuccess,
  getPosts,
  getPostsSuccess,
  likePost,
  likePostSuccess,
  dislikePost,
  dislikePostSuccess,
  comment,
  commentSuccess,
  deleteComment,
  deleteCommentSuccess,
  likeComment,
  likeCommentSuccess,
  dislikeComment,
  dislikeCommentSuccess,
  setPostsError,
};
