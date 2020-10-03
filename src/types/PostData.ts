export default interface PostData {
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  textContent: string;
  likes: string[];
  comments: Omit<PostData, 'comments'>[];
}
