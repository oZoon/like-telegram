import { AppRootState } from "../../index"

export const notificationListSelector = (state: AppRootState) =>
  state.reducerNotification.messageList
