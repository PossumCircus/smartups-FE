import { RootState } from "../../app/store";
import { NotificationDataType, NotificationInitialStateDataType } from "../../types/notificationsType";

export const selectAllNotifications = (state: RootState): NotificationDataType[] => state.notifications.entities;

export const notificationsStatus = (state: RootState): NotificationInitialStateDataType["status"] => state.notifications.status

export const notificationsError = (state: RootState): NotificationInitialStateDataType["error"] => state.notifications.error
