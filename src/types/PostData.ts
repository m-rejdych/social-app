export default interface PostData {
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  textContent: string;
  likeCount: number;
  comments: Omit<PostData, 'comments'>[];
}
