import { POSTS } from '../constants';
import PostData from '../../types/PostData';

export interface LikeDislikeData {
  id: string;
  userId: string;
}

export interface LikeDislikeSuccessData {
  id: string;
  likes: string[];
}

interface SendPostAction {
  type: typeof POSTS.SEND_POST;
  payload: PostData;
}

interface SendPostSuccessAction {
  type: typeof POSTS.SEND_POST_SUCCESS;
  payload: PostData;
}

interface GetPostsAction {
  type: typeof POSTS.GET_POSTS;
  payload: string;
}

interface GetPostsSuccessAction {
  type: typeof POSTS.GET_POSTS_SUCCESS;
  payload: PostData[];
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

export interface PostsState {
  posts: PostData[];
  loading: boolean;
  error: null | string;
}

export type PostsActions =
  | SendPostAction
  | SendPostSuccessAction
  | SetPostsErrorAction
  | GetPostsAction
  | GetPostsSuccessAction
  | LikePostAction
  | LikePostSuccessAction
  | DislikePostAction
  | DislikePostSuccessAction;
