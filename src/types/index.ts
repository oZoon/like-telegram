export type FormatMessageItem = {
  timestamp: number
  message: {
    reply: {
      authorName: string
      message: string
    } | null
    avatar: string | null
    userName: string | null
    message: string | null
    actions: {
      onEdit: (() => void) | null
      onPublicReply: (() => void) | null
      onPrivateReply: (() => void) | null
      onDelete: (() => void) | null
    }
    isPreviuosSameAuthor: boolean
    isActiveUser: boolean
  } | null
}

export type UserItem = {
  id: number
  nickname: string
  password: string
}

export type ChannelItem = {
  name: string
  subName: string
  id: number
}

export type ReplyItem = {
  channelId: number
  messageId: number
}

export type EditItem = ReplyItem & {
  text: string
}

export type PartialItem = {
  channelId: number
  text: string
}

export type MessageListItem = {
  messageId: number
  message: string
  channelId: number
  replyMessageId: number | null
  authorId: number
  timestamp: number
  isDelete: boolean
}

export type DeleteMessageItem = {
  messageId: number
  channelId: number
  lastMessageId: number
}
