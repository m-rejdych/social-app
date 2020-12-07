import Comment from './Comment';
import firebase from 'firebase';

export default interface PostData {
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  textContent: string;
  likes: string[];
  comments: Comment[];
  timestamp: firebase.firestore.Timestamp;
}
