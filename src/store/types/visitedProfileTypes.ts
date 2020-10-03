import { VISITED_PROFILE } from '../constants';
import { ProfileData, ProfileIntro, ProfileDetails } from './profileTypes';

interface GetVisitedProfileDataAction {
  type: typeof VISITED_PROFILE.GET_VISITED_PROFILE_DATA;
  payload: string;
}

interface GetVisitedProfileDataSuccessAction {
  type: typeof VISITED_PROFILE.GET_VISITED_PROFILE_DATA_SUCCESS;
  payload: ProfileData;
}

interface DeleteVisitedFriendAction {
  type: typeof VISITED_PROFILE.DELETE_VISITED_FRIEND;
  payload: { userId: string; friendId: string };
}

interface DeleteVisitedFriendSuccessAction {
  type: typeof VISITED_PROFILE.DELETE_VISITED_FRIEND_SUCCESS;
  payload: string;
}

interface SetVisitedProfileErrorAction {
  type: typeof VISITED_PROFILE.VISITED_PROFILE_FAIL;
  payload: string;
}

export interface VisitedProfileState extends ProfileIntro, ProfileDetails {
  loading: boolean;
  error: null | string;
}

export type VisitedProfileActions =
  | GetVisitedProfileDataAction
  | GetVisitedProfileDataSuccessAction
  | SetVisitedProfileErrorAction
  | DeleteVisitedFriendAction
  | DeleteVisitedFriendSuccessAction;
