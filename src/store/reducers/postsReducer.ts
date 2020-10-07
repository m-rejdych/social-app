import { POSTS } from '../constants';
import PostData from '../../types/PostData';
import {
  PostsActions,
  PostsState,
  LikeDislikeSuccessData,
  CommentSuccessData,
  DeleteCommentSuccessData,
} from '../types/postsTypes';

const initialState: PostsState = {
  posts: [],
  currentPost: {},
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
    case POSTS.DELETE_POST:
      return { ...state, loading: true };
    case POSTS.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== (payload as string)),
      };
    case POSTS.GET_POSTS:
      return { ...state, loading: true };
    case POSTS.GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload as PostData[] };
    case POSTS.GET_POST:
      return { ...state, loading: true };
    case POSTS.GET_POST_SUCCESS:
      return { ...state, loading: false, currentPost: payload as PostData };
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
    case POSTS.DELETE_COMMENT:
      return { ...state, loading: true };
    case POSTS.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === (payload as DeleteCommentSuccessData).postId
            ? {
                ...post,
                comments: (payload as DeleteCommentSuccessData).comments,
              }
            : post,
        ),
      };
    case POSTS.LIKE_COMMENT:
      return { ...state, loading: true };
    case POSTS.LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === (payload as CommentSuccessData).postId
            ? { ...post, comments: (payload as CommentSuccessData).comments }
            : post,
        ),
      };
    case POSTS.DISLIKE_COMMENT:
      return { ...state, loading: true };
    case POSTS.DISLIKE_COMMENT_SUCCESS:
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
