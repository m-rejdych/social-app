import { POSTS } from '../constants';
import PostData from '../../types/PostData';
import {
  PostsActions,
  PostsState,
  LikeDislikeSuccessData,
  CommentSuccessData,
} from '../types/postsTypes';

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
    case POSTS.GET_POSTS:
      return { ...state, loading: true };
    case POSTS.GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload as PostData[] };
    case POSTS.LIKE_POST:
      return { ...state, loading: true };
    case POSTS.LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === (payload as LikeDislikeSuccessData).id
            ? { ...post, likes: (payload as LikeDislikeSuccessData).likes }
            : post,
        ),
      };
    case POSTS.DISLIKE_POST:
      return { ...state, loading: true };
    case POSTS.DISLIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === (payload as LikeDislikeSuccessData).id
            ? { ...post, likes: (payload as LikeDislikeSuccessData).likes }
            : post,
        ),
      };
    case POSTS.COMMENT:
      return { ...state, loading: true };
    case POSTS.COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === (payload as CommentSuccessData).postId
            ? { ...post, comments: (payload as CommentSuccessData).comments }
            : post,
        ),
      };
    case POSTS.POSTS_FAIL:
      return { ...state, loading: false, error: payload as string };
    default:
      return state;
  }
};

export default postsReducer;
