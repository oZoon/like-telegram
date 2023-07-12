import { USER_LIST } from "@/const"
import {
  ChannelItem,
  EditItem,
  FormatMessageItem,
  MessageListItem,
  ReplyItem
} from "@/types"

type Props = {
  list: MessageListItem[]
  channelId: number
  userId: number | null
  channels: ChannelItem[]
  allList: MessageListItem[]
  onEdit: (message: EditItem) => void
  onReply: (replyItem: ReplyItem, channel: ChannelItem) => void
  onDelete: (messageId: number) => void
}

export const formatMessageList = ({
  list,
  channelId,
  userId,
  channels,
  allList,
  onEdit,
  onReply,
  onDelete
}: Props) => {
  list.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return -1
    }
    if (a.timestamp > b.timestamp) {
      return 1
    }
    return 0
  })
  const result: FormatMessageItem[] = []

  const findMessage = (replyMessageId: number | null) => 
    replyMessageId !== null
      ? allList.find((item) => item.messageId === replyMessageId) || null
      : null

  const dateFromStamp = (stamp: number) => new Date(stamp).getDate()

  for (let i = 0; i < list.length; i++) {
    const date = dateFromStamp(list[i].timestamp)
    if (
      (i === 0 && result.length === 0) ||
      date !== dateFromStamp(result[result.length - 1].timestamp)
    ) {
      result.push({
        timestamp: list[i].timestamp,
        message: null
      })
    }

    const isUser = userId !== null && userId === list[i].authorId
    const authorUserName = USER_LIST.find(
      (item) => item.id === list[i].authorId
    )?.nickname
    const replyMessage = findMessage(list[i].replyMessageId)
    const replyUserName =
      replyMessage !== null
        ? USER_LIST.find((item) => item.id === replyMessage.authorId)
            ?.nickname || null
        : null
    const channel =
      channels.find((item) => item.id === channelId) || channels[0]

    result.push({
      timestamp: list[i].timestamp,
      message: {
        reply:
          replyMessage !== null && replyUserName !== null
            ? {
                authorName: replyUserName,
                message: replyMessage.message
              }
            : null,
        avatar:
          list[i + 1] && list[i].authorId === list[i + 1].authorId
            ? null
            : authorUserName?.at(0) || null,
        userName:
          (list[i - 1] && list[i].authorId === list[i - 1].authorId) || isUser
            ? null
            : authorUserName || null,
        message: list[i].message,
        actions: {
          onEdit: isUser
            ? () =>
                onEdit({
                  channelId,
                  messageId: list[i].messageId,
                  text: list[i].message
                })
            : null,
          onPrivateReply: !isUser
            ? () =>
                onReply(
                  { channelId: list[i].authorId, messageId: list[i].messageId },
                  {
                    name: authorUserName || "ник",
                    subName: "...",
                    id: list[i].authorId
                  }
                )
            : null,
          onPublicReply: !isUser
            ? () =>
                onReply(
                  { channelId, messageId: list[i].messageId },
                  { ...channel }
                )
            : null,
          onDelete: isUser ? () => onDelete(list[i].messageId) : null
        },
        isPreviuosSameAuthor:
          list[i - 1] && list[i].authorId === list[i - 1].authorId,
        isActiveUser: isUser
      }
    })
  }

  return result
}
