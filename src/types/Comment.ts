import PostData from './PostData';

type Comment = Omit<PostData, 'comments'>;

export default Comment;
