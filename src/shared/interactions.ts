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

const deleteNotification = async (
  userId: string,
  notificationId: string,
): Promise<void> => {
  try {
    const response = await db.collection('users').doc(userId).get();
    const notifications: Notification[] = response.data()!.notifications;
    const updatedNotifications = notifications.filter(
      ({ id }) => notificationId !== id,
    );
    await db
      .collection('users')
      .doc(userId)
      .update({ notifications: updatedNotifications });
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

const likePost = async (postId: string, userId: string): Promise<void> => {
  try {
    const postResponse = await db.collection('posts').doc(postId).get();
    const likes: string[] = postResponse.data()!.likes;
    await db
      .collection('posts')
      .doc(postId)
      .update({ likes: [...likes, userId] });
  } catch (error) {
    console.log(error.message);
  }
};

const dislikePost = async (postId: string, userId: string): Promise<void> => {
  try {
    const postResponse = await db.collection('posts').doc(postId).get();
    const likes: string[] = postResponse.data()!.likes;
    const updatedLikes = likes.filter((id) => id !== userId);
    await db.collection('posts').doc(postId).update({ likes: updatedLikes });
  } catch (error) {
    console.log(error.message);
  }
};

export {
  sendNotification,
  deleteNotification,
  unsendFriendRequest,
  likePost,
  dislikePost,
};
