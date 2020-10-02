import { db } from '../firebase';
import Notification from '../types/Notificaiton';
import { NOTIFICATION_TYPES } from './constants';

const sendNotification = async ({
  fromName,
  fromUserId,
  toUserId,
  type,
  isSeen,
  id,
}: Notification): Promise<void> => {
  try {
    const response = await db.collection('users').doc(toUserId).get();
    const notifications: Notification[] = [
      ...response.data()!.notifications,
      { fromUserId, toUserId, fromName, type, isSeen, id },
    ];
    await db.collection('users').doc(toUserId).update({ notifications });
  } catch (error) {
    console.log(error.message);
  }
};

const unsendFriendRequest = async (
  requestingUserId: string,
  requestedUserId: string,
): Promise<void> => {
  try {
    const response = await db.collection('users').doc(requestedUserId).get();
    const notifications: Notification[] = response.data()!.notifications;
    const updatedNotifications = notifications.filter(
      ({ fromUserId, toUserId, type }) =>
        !(
          type === NOTIFICATION_TYPES.FRIEND_REQUEST &&
          fromUserId === requestingUserId &&
          toUserId === requestedUserId
        ),
    );
    await db
      .collection('users')
      .doc(requestedUserId)
      .update({ notifications: updatedNotifications });
  } catch (error) {
    console.log(error.message);
  }
};

export { sendNotification, unsendFriendRequest };
