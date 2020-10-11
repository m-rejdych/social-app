import Message from '../../types/Message';
import { CHAT } from '../constants';

interface SetRightOffsetAction {
  type: typeof CHAT.SET_RIGHT_OFFSET;
  payload: number;
}

interface SetChatOpenAction {
  type: typeof CHAT.SET_OPEN;
  payload: boolean;
}

export type ChatActions = SetRightOffsetAction | SetChatOpenAction;

export interface ChatState {
  open: boolean;
  rightOffset: number;
}
