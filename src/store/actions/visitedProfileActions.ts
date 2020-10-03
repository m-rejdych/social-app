import { VISITED_PROFILE } from '../constants';
import { VisitedProfileActions } from '../types/visitedProfileTypes';
import { ProfileActions, ProfileData } from '../types/profileTypes';

const getVisitedProfileData = (userId: string): VisitedProfileActions => ({
  type: VISITED_PROFILE.GET_VISITED_PROFILE_DATA,
  payload: userId,
});

const getVisitedProfileDataSuccess = (
  profileData: ProfileData,
): VisitedProfileActions => ({
  type: VISITED_PROFILE.GET_VISITED_PROFILE_DATA_SUCCESS,
  payload: profileData,
});

const deleteVisitedFriend = (ids: {
  userId: string;
  friendId: string;
}): VisitedProfileActions => ({
  type: VISITED_PROFILE.DELETE_VISITED_FRIEND,
  payload: ids,
});

const deleteVisitedFriendSuccess = (friendId: string): ProfileActions => ({
  type: VISITED_PROFILE.DELETE_VISITED_FRIEND_SUCCESS,
  payload: friendId,
});

const setVisitedProfileError = (error: string): ProfileActions => ({
  type: VISITED_PROFILE.VISITED_PROFILE_FAIL,
  payload: error,
});

export {
  getVisitedProfileData,
  getVisitedProfileDataSuccess,
  deleteVisitedFriend,
  deleteVisitedFriendSuccess,
  setVisitedProfileError,
};
