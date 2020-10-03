import Comment from './Comment';

export default interface PostData {
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  textContent: string;
  likes: string[];
  comments: Comment[];
}
