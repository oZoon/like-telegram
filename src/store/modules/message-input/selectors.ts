import { AppRootState } from "../../index"

export const replyListSelector = (state: AppRootState) =>
  state.reducerMessageInput.replyList
export const partialMessageListSelector = (state: AppRootState) =>
  state.reducerMessageInput.partialMessageList
export const editMessageListSelector = (state: AppRootState) =>
state.reducerMessageInput.editMessageList