import PostData from '../../types/PostData';
import { POSTS } from '../constants';
import { PostsActions } from '../types/postsTypes';

const sendPost = (postData: PostData): PostsActions => ({
  type: POSTS.SEND_POST,
  payload: postData,
});

const sendPostSuccess = (postData: PostData): PostsActions => ({
  type: POSTS.SEND_POST_SUCCESS,
  payload: postData,
});

const getPosts = (userId: string): PostsActions => ({
  type: POSTS.GET_POSTS,
  payload: userId,
});

const getPostsSuccess = (fetchedPosts: PostData[]): PostsActions => ({
  type: POSTS.GET_POSTS_SUCCESS,
  payload: fetchedPosts,
});

const setPostsError = (error: string): PostsActions => ({
  type: POSTS.POSTS_FAIL,
  payload: error,
});

export { sendPost, sendPostSuccess, setPostsError, getPosts, getPostsSuccess };
