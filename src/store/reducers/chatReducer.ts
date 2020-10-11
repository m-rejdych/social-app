import { ChatState, ChatActions } from '../types/chatTypes';
import { CHAT } from '../constants';

const initialState: ChatState = {
  open: false,
  rightOffset: 0,
};

const chatReducer = (
  state = initialState,
  { type, payload }: ChatActions,
): ChatState => {
  switch (type) {
    case CHAT.SET_RIGHT_OFFSET:
      return { ...state, rightOffset: payload as number };
    case CHAT.SET_OPEN:
      return { ...state, open: payload as boolean };
    default:
      return state;
  }
};

export default chatReducer;
