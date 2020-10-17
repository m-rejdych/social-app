import { CHAT } from '../constants';

interface SetOpenAction {
  type: typeof CHAT.SET_OPEN;
  payload: boolean;
}

interface SetTargetAction {
  type: typeof CHAT.SET_TARGET;
  payload: string;
}

export interface ChatState {
  open: boolean;
  target: string;
}

export type ChatActions = SetOpenAction | SetTargetAction;
