export default interface Notification {
  fromUserId: string;
  toUserId: string;
  fromName: string;
  type: 'friendRequest';
}
