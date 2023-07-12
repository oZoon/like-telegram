import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Chat } from "@/components/Chat"
import { AppDispatch } from "@/store"
import {
  activeChannelIdSelector,
  channelsListSelector,
} from "@/store/modules/channels"
import {
  editMessageListSelector,
  mountEdit,
  mountReply,
  replyListSelector,
} from "@/store/modules/message-input"
import {
  deleteMessage,
  messageListSelector,
} from "@/store/modules/message-list"
import { userId } from "@/store/modules/user"
import { ChannelItem, EditItem, ReplyItem } from "@/types"

export const ChatList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const chatList = useSelector(messageListSelector)
  const activeId = useSelector(activeChannelIdSelector)
  const id = useSelector(userId)
  const channels = useSelector(channelsListSelector)

  const replyArray = useSelector(replyListSelector)
  const editArray = useSelector(editMessageListSelector)

  const replyBoolean = React.useMemo(
    () => replyArray.some((item) => item.channelId === activeId),
    [activeId, replyArray]
  )

  const editBoolean = React.useMemo(
    () => editArray.some((item) => item.channelId === activeId),
    [activeId, editArray]
  )

  const currentChatList = React.useMemo(
    () =>
      chatList.filter((item) => item.channelId === activeId && !item.isDelete),
    [activeId, chatList]
  )

  const handleEdit = React.useCallback(
    (message: EditItem) => dispatch(mountEdit(message)),
    [dispatch]
  )

  const handleReply = React.useCallback(
    (replyItem: ReplyItem, channel: ChannelItem) =>
      dispatch(mountReply(replyItem, channel)),
    [dispatch]
  )

  const handleDelete = React.useCallback(
    (messageId: number) =>
      dispatch(
        deleteMessage({
          messageId,
          channelId: activeId,
          lastMessageId: currentChatList[currentChatList.length - 1].messageId,
        })
      ),
    [activeId, currentChatList, dispatch]
  )

  return (
    <Chat
      list={currentChatList}
      onEdit={handleEdit}
      onReply={handleReply}
      onDelete={handleDelete}
      channelId={activeId}
      userId={id}
      channels={channels}
      isReply={replyBoolean || editBoolean}
      allList={chatList}
    />
  )
}
