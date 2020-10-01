import { db } from '../firebase';
import Notification from '../types/Notificaiton';

const sendNotification = async ({
  fromName,
  fromUserId,
  toUserId,
  type,
}: Notification): Promise<void> => {
  try {
    const response = await db.collection('users').doc(toUserId).get();
    const notifications: Notification[] = [
      ...response.data()!.notifications,
      { fromUserId, toUserId, fromName, type },
    ];
    await db.collection('users').doc(toUserId).update({ notifications });
  } catch (error) {
    console.log(error.message);
  }
};

export { sendNotification };
