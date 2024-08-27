import { UserDataType } from "./usersType";

export interface NotificationDataType {
    _id: string; // Assuming MongoDB ObjectId is converted to string
    recipient: string; // User ID as string
    sender?: Pick<UserDataType, 'username'>; // Optional User ID as string or oid from DB
    notificationType: 'post_new_comment'| 'post_like'| 'comment_new_reply'| 'chat';
    link?: string; // Optional link 
    isNewOne: boolean;
    isRead: boolean;
    createdAt: string; // ISO date string
}

export interface NotificationInitialStateDataType {
    entities: NotificationDataType[],
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export interface NotificationsStateType {
    postLikes: boolean;
    postNewComments: boolean;
    commentNewReplies: boolean;
    chats: boolean;
}