import { CHAT } from '../constants';
import { ChatState, ChatActions } from '../types/chatTypes';

const initialState: ChatState = {
  open: false,
  target: '',
};

const chatReducer = (
  state = initialState,
  { type, payload }: ChatActions,
): ChatState => {
  switch (type) {
    case CHAT.SET_OPEN:
      return { ...state, open: payload as boolean };
    case CHAT.SET_TARGET:
      return { ...state, target: payload as string };
    default:
      return state;
  }
};

export default chatReducer;
