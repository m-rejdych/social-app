import { POSTS } from '../constants';
import PostData from '../../types/PostData';
import { PostsActions, PostsState } from '../types/postsTypes';

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsReducer = (
  state = initialState,
  { type, payload }: PostsActions,
): PostsState => {
  switch (type) {
    case POSTS.SEND_POST:
      return { ...state, loading: true };
    case POSTS.SEND_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, payload as PostData],
      };
    case POSTS.POSTS_FAIL:
      return { ...state, loading: false, error: payload as string };
    case POSTS.GET_POSTS:
      return { ...state, loading: true };
    case POSTS.GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload as PostData[] };
    default:
      return state;
  }
};

export default postsReducer;
