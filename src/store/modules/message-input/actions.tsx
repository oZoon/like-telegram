import { createAction } from "@reduxjs/toolkit"

import { AppDispatch } from "@/store"
import { ChannelItem, EditItem, PartialItem, ReplyItem } from "@/types"
import { actionChangeSubtitleChannel, actionCreateChannel } from "../channels"
import { actionAddMessage, actionEditMessage } from "../message-list"

const PREFIX = "INPUT"

// mount reply message
export const MOUNT_REPLY = `${PREFIX}/MOUNT_REPLY`
export const actionMountReply = createAction<ReplyItem>(MOUNT_REPLY)
export const mountReply =
  (replyItem: ReplyItem, channel: ChannelItem) => (dispatch: AppDispatch) => {
    dispatch(actionCreateChannel(channel))
    dispatch(actionMountReply(replyItem))
  }

// unmount reply message
export const UNMOUNT_REPLY = `${PREFIX}/UNMOUNT_REPLY`
export const actionUnmountReply =
  createAction<ReplyItem["channelId"]>(UNMOUNT_REPLY)
export const unmountReply =
  (channelId: ReplyItem["channelId"]) => (dispatch: AppDispatch) =>
    dispatch(actionUnmountReply(channelId))

// save partial message
export const SAVE_PART_MESSAGE = `${PREFIX}/SAVE_PART_MESSAGE`
export const actionSavePartMessage =
  createAction<PartialItem>(SAVE_PART_MESSAGE)
export const savePartMessage =
  (partial: PartialItem) => (dispatch: AppDispatch) =>
    dispatch(actionSavePartMessage(partial))

// mount edit message
export const MOUNT_EDIT = `${PREFIX}/MOUNT_EDIT`
export const actionMountEdit = createAction<EditItem>(MOUNT_EDIT)
export const mountEdit = (edit: EditItem) => (dispatch: AppDispatch) => {
  dispatch(actionMountEdit(edit))
  dispatch(
    actionSavePartMessage({ channelId: edit.channelId, text: edit.text })
  )
}

// unmount edit message
export const UNMOUNT_EDIT = `${PREFIX}/UNMOUNT_EDIT`
export const actionUnmountEdit =
  createAction<EditItem["channelId"]>(UNMOUNT_EDIT)
export const unmountEdit =
  (channelId: EditItem["channelId"]) => (dispatch: AppDispatch) => {
    dispatch(actionUnmountEdit(channelId))
    dispatch(actionSavePartMessage({ channelId: channelId, text: "" }))
  }

type AddMessageProps = {
  channelId: number
  message: string | null
  replyItem: ReplyItem | null
  authorId: number | null
  editItem: ReplyItem | null
  messageListLength: number
}

// submit input
export const submitInput =
  ({
    channelId,
    message,
    replyItem,
    authorId,
    editItem,
    messageListLength,
  }: AddMessageProps) =>
  (dispatch: AppDispatch) => {
    // reply message
    if (replyItem !== null && editItem === null && authorId !== null) {
      dispatch(
        actionAddMessage({
          messageId: messageListLength,
          message: message || "",
          channelId,
          replyMessageId: replyItem.messageId,
          authorId,
          timestamp: +new Date(),
          isDelete: false,
        })
      )
      dispatch(actionUnmountReply(replyItem.channelId))
      dispatch(
        actionChangeSubtitleChannel({
          id: channelId,
          subName: message || "",
        })
      )
      dispatch(
        actionSavePartMessage({
          channelId,
          text: "",
        })
      )
    }

    // edit message
    if (replyItem === null && editItem !== null && authorId !== null) {
      dispatch(
        actionEditMessage({
          messageId: editItem.messageId,
          text: message || "",
        })
      )
      dispatch(actionUnmountEdit(editItem.channelId))
      dispatch(
        actionSavePartMessage({
          channelId,
          text: "",
        })
      )
      if (editItem.messageId === messageListLength - 1) {
        dispatch(
          actionChangeSubtitleChannel({
            id: channelId,
            subName: message || "",
          })
        )
      }
    }

    // simple submit
    if (replyItem === null && editItem === null && authorId !== null) {
      dispatch(
        actionAddMessage({
          messageId: messageListLength,
          message: message || "",
          channelId,
          replyMessageId: null,
          authorId,
          timestamp: +new Date(),
          isDelete: false,
        })
      )
      dispatch(
        actionChangeSubtitleChannel({
          id: channelId,
          subName: message || "",
        })
      )
      dispatch(
        actionSavePartMessage({
          channelId,
          text: "",
        })
      )
    }
  }
