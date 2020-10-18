import { db } from '../firebase';
import { NOTIFICATION_TYPES } from './constants';
import { ProfileData, Messages } from '../store/types/profileTypes';
import Notification from '../types/Notificaiton';
import PostData from '../types/PostData';
import Message from '../types/Message';

const sendNotification = async (notification: Notification): Promise<void> => {
  try {
    const { toUserId } = notification;
    const response = await db.collection('users').doc(toUserId).get();
    const notifications: Notification[] = [
      ...response.data()!.notifications,
      notification,
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

const addFriend = async (userId: string, friendId: string): Promise<void> => {
  try {
    const userResponse = await db.collection('users').doc(userId).get();
    const friendResponse = await db.collection('users').doc(friendId).get();
    const {
      firstName: userFirstName,
      lastName: userLastName,
      friends: userFriends,
    } = userResponse.data() as ProfileData;
    const {
      firstName: friendFirstName,
      lastName: friendLastName,
      friends: friendFriends,
    } = friendResponse.data() as ProfileData;
    await db
      .collection('users')
      .doc(userId)
      .update({
        friends: [
          ...userFriends,
          {
            userId: friendId,
            firstName: friendFirstName,
            lastName: friendLastName,
          },
        ],
      });
    await db
      .collection('users')
      .doc(friendId)
      .update({
        friends: [
          ...friendFriends,
          { userId: userId, firstName: userFirstName, lastName: userLastName },
        ],
      });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteFriend = async (
  userId: string,
  friendId: string,
): Promise<void> => {
  try {
    const userResponse = await db.collection('users').doc(userId).get();
    const friendResponse = await db.collection('users').doc(friendId).get();
    const { friends: userFriends } = userResponse.data() as ProfileData;
    const { friends: friendFriends } = friendResponse.data() as ProfileData;
    await db
      .collection('users')
      .doc(userId)
      .update({
        friends: userFriends.filter(({ userId }) => userId !== friendId),
      });
    await db
      .collection('users')
      .doc(friendId)
      .update({
        friends: friendFriends.filter(
          ({ userId: storedId }) => storedId !== userId,
        ),
      });
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

const getPostData = async (postId: string): Promise<PostData> => {
  const response = await db.collection('posts').doc(postId).get();
  console.log(response.data());
  return response.data() as PostData;
};

const sendMessage = async (message: Message) => {
  try {
    const { fromUserId, toUserId } = message;
    const friendResponse = await db.collection('users').doc(toUserId).get();
    const userResponse = await db.collection('users').doc(fromUserId).get();
    const { messages: friendMessages } = friendResponse.data()!;
    const { messages: userMessages } = userResponse.data()!;
    const updatedFriendMessages: Messages = {
      ...friendMessages,
      [fromUserId]: friendMessages[fromUserId]
        ? [...friendMessages[fromUserId], message]
        : [message],
    };
    const updatedUserMessages: Messages = {
      ...userMessages,
      [toUserId]: userMessages[toUserId]
        ? [...userMessages[toUserId], { ...message, isSeen: true }]
        : [{ ...message, isSeen: true }],
    };
    await db
      .collection('users')
      .doc(toUserId)
      .update({ messages: updatedFriendMessages });
    await db
      .collection('users')
      .doc(fromUserId)
      .update({ messages: updatedUserMessages });
  } catch (error) {
    console.log(error.message);
  }
};

export {
  sendNotification,
  addFriend,
  deleteFriend,
  deleteNotification,
  unsendFriendRequest,
  likePost,
  dislikePost,
  getPostData,
  sendMessage,
};
