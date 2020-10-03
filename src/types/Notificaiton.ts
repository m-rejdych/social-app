type NotificationTypes = 'friendRequest' | 'friendApproval';

export default interface Notification {
  fromUserId: string;
  toUserId: string;
  fromName: string;
  type: NotificationTypes;
  isSeen: boolean;
  id: string;
}
