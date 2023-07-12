import { createAction } from "@reduxjs/toolkit"

import { AppDispatch } from "@/store"
import { DeleteMessageItem, MessageListItem } from "@/types"
import { actionChangeSubtitleChannel } from "../channels"

const PREFIX = "MESSAGE_LIST"

// add message
export const ADD_MESSAGE = `${PREFIX}/ADD_MESSAGE`
export const actionAddMessage = createAction<MessageListItem>(ADD_MESSAGE)

// edit message
export const EDIT_MESSAGE = `${PREFIX}/EDIT_MESSAGE`
export const actionEditMessage = createAction<{
  messageId: number
  text: string
}>(EDIT_MESSAGE)

// delete message (mark as delete)
export const DELETE_MESSAGE = `${PREFIX}/DELETE_MESSAGE`
export const actionDeleteMessage = createAction<number>(DELETE_MESSAGE)
export const deleteMessage =
  ({ messageId, channelId, lastMessageId }: DeleteMessageItem) =>
  (dispatch: AppDispatch) => {
    dispatch(actionDeleteMessage(messageId))
    if (messageId === lastMessageId) {
      dispatch(actionChangeSubtitleChannel({ id: channelId, subName: "..." }))
    }
  }
