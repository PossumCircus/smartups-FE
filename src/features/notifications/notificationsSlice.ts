import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationDataType, NotificationInitialStateDataType } from "../../types/notificationsType";
import { fetchNotifications, deleteNotification } from "./notificationsAsyncThunks";

const initialState: NotificationInitialStateDataType = {
  entities: [] as NotificationDataType[],
  status: 'idle',
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setAllNotificationsRead(state, action: PayloadAction<NotificationDataType[]>) {
      state.entities.forEach(notification => notification.isRead = true)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<NotificationDataType[]>) => {
        console.log('fulfilled', action.payload)
        const existingIds = new Set(state.entities?.map(notification => notification._id));
        const newNotifications = action.payload?.filter(notification => !existingIds.has(notification._id));
        state.entities = state.entities.concat(newNotifications);
        state.status = 'succeeded'
      })
      .addCase(fetchNotifications.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed'
        state.error = "not found notifications(temporal custom error)"
      })
    builder
      .addCase(deleteNotification.fulfilled, (state, action: PayloadAction<NotificationDataType[]>) => {
        console.log('fulfilled', action.payload)
        state.status = 'succeeded'
      })
      .addCase(deleteNotification.pending, (state, action) => {
        console.log('pending', action.payload)
        state.status = 'loading'
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        console.log('rejected', action.payload)
        state.status = 'failed'
        state.error = "there is no notification to delete(temporal custom error)"
      })
  }
});
export const { setAllNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer;
