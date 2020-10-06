type NotificationTypes =
  | 'friendRequest'
  | 'friendApproval'
  | 'postLike'
  | 'comment'
  | 'commentLike';

export default interface Notification {
  fromUserId: string;
  toUserId: string;
  fromName: string;
  type: NotificationTypes;
  isSeen: boolean;
  id: string;
}
