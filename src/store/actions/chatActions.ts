import { CHAT } from '../constants';
import { ChatActions } from '../types/chatTypes';

const setOpen = (isOpen: boolean): ChatActions => ({
  type: CHAT.SET_OPEN,
  payload: isOpen,
});

const setTarget = (target: string): ChatActions => ({
  type: CHAT.SET_TARGET,
  payload: target,
});

export { setOpen, setTarget };
