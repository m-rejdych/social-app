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

interface setVisitedProfileErrorAction {
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
  | setVisitedProfileErrorAction;
