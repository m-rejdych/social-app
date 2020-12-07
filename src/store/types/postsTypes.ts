import { POSTS } from '../constants';
import PostData from '../../types/PostData';
import Comment from '../../types/Comment';

export interface LikeDislikeData {
  id: string;
  userId: string;
}

export interface LikeDislikeSuccessData {
  id: string;
  likes: string[];
}

export interface CommentData {
  postId: string;
  comment: Comment;
}

export interface CommentSuccessData {
  postId: string;
  comments: Comment[];
}

export interface DeleteCommentData {
  postId: string;
  commentId: string;
}

export interface DeleteCommentSuccessData {
  postId: string;
  comments: Comment[];
}

export interface LikeDislikeCommentData {
  postId: string;
  commentId: string;
  userId: string;
}

interface SendPostAction {
  type: typeof POSTS.SEND_POST;
  payload: PostData;
}

interface DeletePostAction {
  type: typeof POSTS.DELETE_POST;
  payload: string;
}

interface DeletePostSuccessAction {
  type: typeof POSTS.DELETE_POST_SUCCESS;
  payload: string;
}

interface SendPostSuccessAction {
  type: typeof POSTS.SEND_POST_SUCCESS;
  payload: PostData;
}

interface GetPostsAction {
  type: typeof POSTS.GET_POSTS;
  payload: string[];
}

interface GetPostsSuccessAction {
  type: typeof POSTS.GET_POSTS_SUCCESS;
  payload: PostData[];
}

interface GetPostAction {
  type: typeof POSTS.GET_POST;
  payload: string;
}

interface GetPostSuccessAction {
  type: typeof POSTS.GET_POST_SUCCESS;
  payload: PostData;
}

interface SetPostsErrorAction {
  type: typeof POSTS.POSTS_FAIL;
  payload: string;
}

interface LikePostAction {
  type: typeof POSTS.LIKE_POST;
  payload: LikeDislikeData;
}

interface LikePostSuccessAction {
  type: typeof POSTS.LIKE_POST_SUCCESS;
  payload: LikeDislikeSuccessData;
}

interface DislikePostAction {
  type: typeof POSTS.DISLIKE_POST;
  payload: LikeDislikeData;
}

interface DislikePostSuccessAction {
  type: typeof POSTS.DISLIKE_POST_SUCCESS;
  payload: LikeDislikeSuccessData;
}

interface CommentAction {
  type: typeof POSTS.COMMENT;
  payload: CommentData;
}

interface CommentSuccessAction {
  type: typeof POSTS.COMMENT_SUCCESS;
  payload: CommentSuccessData;
}

interface DeleteCommentAction {
  type: typeof POSTS.DELETE_COMMENT;
  payload: DeleteCommentData;
}

interface DeleteCommentSuccessAction {
  type: typeof POSTS.DELETE_COMMENT_SUCCESS;
  payload: DeleteCommentSuccessData;
}

interface LikeCommentAction {
  type: typeof POSTS.LIKE_COMMENT;
  payload: LikeDislikeCommentData;
}

interface LikeCommentSuccessAction {
  type: typeof POSTS.LIKE_COMMENT_SUCCESS;
  payload: CommentSuccessData;
}

interface DislikeCommentAction {
  type: typeof POSTS.DISLIKE_COMMENT;
  payload: LikeDislikeCommentData;
}

interface DislikeCommentSuccessAction {
  type: typeof POSTS.DISLIKE_COMMENT_SUCCESS;
  payload: CommentSuccessData;
}

export interface PostsState {
  posts: PostData[];
  currentPost: PostData | {};
  loading: boolean;
  error: null | string;
}

export type PostsActions =
  | SendPostAction
  | SendPostSuccessAction
  | DeletePostAction
  | DeletePostSuccessAction
  | SetPostsErrorAction
  | GetPostsAction
  | GetPostsSuccessAction
  | GetPostAction
  | GetPostSuccessAction
  | LikePostAction
  | LikePostSuccessAction
  | DislikePostAction
  | DislikePostSuccessAction
  | CommentAction
  | CommentSuccessAction
  | DeleteCommentAction
  | DeleteCommentSuccessAction
  | LikeCommentAction
  | LikeCommentSuccessAction
  | DislikeCommentAction
  | DislikeCommentSuccessAction;
