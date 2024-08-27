import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { NotificationDataType } from "../../types/notificationsType";

interface FetchNotificationsArgsDataType {
  loginUserId: string;
  config?: AxiosRequestConfig
}

interface SetReadNotificationArgsDataType {
  notificationId: string
  config?: AxiosRequestConfig
}

export interface CreateNotificationDataType {
  recipient: string;
  sender?: string;
  notificationType: 'post_new_comment' | 'post_like' | 'comment_new_reply' | 'chat';
  link?: string;
  isNewOne: boolean;
  isRead: boolean;
  config?: AxiosRequestConfig
}

export const createNotification = createAsyncThunk<NotificationDataType, CreateNotificationDataType>(
  'notifications/createNotification',
  async (creationData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_NOTIFICATION_API_URL}`, creationData)
    return data
  }
)

export const fetchNotifications = createAsyncThunk<NotificationDataType[], FetchNotificationsArgsDataType>(
  'notifications/fetchNotifications',
  async ({ loginUserId }) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_NOTIFICATION_API_URL}/${loginUserId}`);
      return data
    } catch (error) {
      console.log(error)
    }
  }
);

export const setReadNotification = createAsyncThunk<NotificationDataType, SetReadNotificationArgsDataType>(
  'notifications/setReadNotification',
  async ({ notificationId }) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_NOTIFICATION_API_URL}/${notificationId}`);
      return data
    } catch (error) {
      console.log(error)
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId: string) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_NOTIFICATION_API_URL}/${notificationId}`)
    return data
  }
)

// export const fetchNotifications = createAsyncThunk<NotificationDataType[], void, { state: RootState }>(
//   'notifications/fetchNotifications',
//   async (_, { getState }) => {
//     try {
//       const state = getState()
//       const allNotifications = selectAllNotifications(state);
//       console.log('allNotifications',allNotifications)
//       const [latestNotification] = allNotifications;
//       const latestTimestamp = latestNotification ? latestNotification.createdAt : '';
//       const { data } = await axios.get(`${process.env.REACT_APP_NOTIFICATION_API_URL}`);
//       return data
//     } catch (error) {
//       console.log(error)
//     }
//   }
// );