import firebase from 'firebase';

interface Message {
  from: string;
  fromUserId: string;
  toUserId: string;
  messageText: string;
  id: string;
  isSeen: boolean;
  timestamp: firebase.firestore.Timestamp;
}

export default Message;
