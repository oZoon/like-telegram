import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { InputArea } from "@/components/InputArea"
import { findMessage } from "@/helpers/findMessage"
import { AppDispatch } from "@/store"
import { activeChannelIdSelector } from "@/store/modules/channels"
import {
  editMessageListSelector,
  partialMessageListSelector,
  replyListSelector,
  savePartMessage,
  submitInput,
  unmountEdit,
  unmountReply,
} from "@/store/modules/message-input"
import { messageListSelector } from "@/store/modules/message-list"
import { userId } from "@/store/modules/user"

export const InputField: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const replyArray = useSelector(replyListSelector)
  const partialMessageArray = useSelector(partialMessageListSelector)
  const editArray = useSelector(editMessageListSelector)
  const channelId = useSelector(activeChannelIdSelector)
  const chatList = useSelector(messageListSelector)
  const userID = useSelector(userId)

  const replyItem =
    replyArray.find((item) => item.channelId === channelId) || null

  const replyData = React.useMemo(() => {
    if (!replyItem) {
      return null
    }
    return findMessage(replyItem.messageId, chatList)
  }, [chatList, replyItem])

  const editItem =
    editArray.find((item) => item.channelId === channelId) || null

  const editData = React.useMemo(() => {
    if (!editItem) {
      return null
    }
    return findMessage(editItem.messageId, chatList)
  }, [chatList, editItem])

  const message = React.useMemo(
    () =>
      partialMessageArray.find((item) => item.channelId === channelId)?.text ||
      null,
    [channelId, partialMessageArray]
  )

  const handleCloseReply = React.useCallback(() => {
    dispatch(unmountReply(channelId))
  }, [channelId, dispatch])

  const handleCloseEdit = React.useCallback(() => {
    dispatch(unmountEdit(channelId))
  }, [channelId, dispatch])

  const handleInputSubmit = React.useCallback(() => {
    dispatch(
      submitInput({
        channelId,
        message,
        replyItem,
        authorId: userID,
        editItem,
        messageListLength: chatList.length,
      })
    )
  }, [
    channelId,
    chatList.length,
    dispatch,
    editItem,
    message,
    replyItem,
    userID,
  ])

  const handlePartialMessage = React.useCallback(
    (text: string) => {
      dispatch(savePartMessage({ channelId, text }))
    },
    [channelId, dispatch]
  )

  if (userID === null) {
    return null
  }

  return (
    <InputArea
      replyData={replyData}
      partialData={message}
      editData={editData}
      onCloseReply={handleCloseReply}
      onCloseEdit={handleCloseEdit}
      onInputSubmit={handleInputSubmit}
      onSavePartialMessage={handlePartialMessage}
    />
  )
}
