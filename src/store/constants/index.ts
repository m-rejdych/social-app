const AUTH = {
  SIGN_UP: 'AUTH_SIGN_UP',
  SIGN_IN: 'AUTH_SIGN_IN',
  SIGN_UP_SUCCESS: 'AUTH_SIGN_UP_SUCCESS',
  SIGN_IN_SUCCESS: 'AUTH_SIGN_IN_SUCCESS',
  LOAD_USER: 'AUTH_LOAD_USER',
  FAIL: 'AUTH_FAIL',
  RESET_ERROR: 'AUTH_RESET_ERROR',
};

const PROFILE = {
  SET_PROFILE_INTRO: 'PROFILE_SET_PROFILE_INTRO',
  SET_PROFILE_INTRO_SUCCESS: 'PROFILE_SET_PROFILE_INTRO_SUCCESS',
  GET_PROFILE_DATA: 'PROFILE_GET_PROFILE_DATA',
  GET_PROFILE_DATA_SUCCESS: 'PROFILE_GET_PROFILE_DATA_SUCCESS',
  UPDATE_PROFILE_FIELD: 'PROFILE_UPDATE_PROFILE_FIELD',
  UPDATE_PROFILE_FIELD_SUCCESS: 'PROFILE_UPDATE_PROFILE_FIELD_SUCCESS',
  SEND_NOTIFICATION: 'PROFILE_SEND_NOTIFICATION',
  ADD_FRIEND: 'PROFILE_ADD_FRIEND',
  ADD_FRIEND_SUCCESS: 'PROFILE_ADD_FRIEND_SUCCESS',
  PROFILE_FAIL: 'PROFILE_FAIL',
};

const VISITED_PROFILE = {
  GET_VISITED_PROFILE_DATA: 'VISITED_PROFILE_GET_VISITED_PROFILE_DATA',
  GET_VISITED_PROFILE_DATA_SUCCESS:
    'VISITED_PROFILE_GET_VISITED_PROFILE_DATA_SUCCESS',
  VISITED_PROFILE_FAIL: 'VISITED_PROFILE_FAIL',
};

const POSTS = {
  SEND_POST: 'POSTS_SEND_POST',
  SEND_POST_SUCCESS: 'POSTS_SEND_POST_SUCCESS',
  GET_POSTS: 'POSTS_GET_POSTS',
  GET_POSTS_SUCCESS: 'POSTS_GET_POSTS_SUCCESS',
  POSTS_FAIL: 'POSTS_FAIL',
};

const USERS = {
  GET_USERS: 'USERS_GET_USERS',
  GET_USERS_SUCCESS: 'USERS_GET_USERS_SUCCESS',
  USERS_FAIL: 'USERS_FAIL',
};

export { AUTH, PROFILE, POSTS, USERS, VISITED_PROFILE };
