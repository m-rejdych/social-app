type NotificationTypes = 'friendRequest';

export default interface Notification {
  fromUserId: string;
  toUserId: string;
  fromName: string;
  type: NotificationTypes;
  isSeen: boolean;
  id: string;
}
