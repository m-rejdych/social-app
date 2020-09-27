import { POSTS } from '../constants';
import PostData from '../../types/PostData';

interface SendPostAction {
  type: typeof POSTS.SEND_POST;
  payload: PostData;
}

interface SendPostSuccessAction {
  type: typeof POSTS.SEND_POST_SUCCESS;
  payload: PostData;
}

interface SetPostsErrorAction {
  type: typeof POSTS.POSTS_FAIL;
  payload: string;
}

interface GetPostsAction {
  type: typeof POSTS.GET_POSTS;
  payload: string;
}

interface GetPostsSuccessAction {
  type: typeof POSTS.GET_POSTS_SUCCESS;
  payload: PostData[];
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
  | GetPostsSuccessAction;
