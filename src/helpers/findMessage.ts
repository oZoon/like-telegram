import { USER_LIST } from "@/const"
import { MessageListItem } from "@/types"

export const findMessage = (messageId: number, messages: MessageListItem[]) => {
  const message = messages.find((item) => item.messageId === messageId)
  if (!message) {
    return null
  }

  const user = USER_LIST.find((item) => item.id === message.authorId)
  if (!user) {
    return null
  }

  return {
    user,
    message
  }
}
