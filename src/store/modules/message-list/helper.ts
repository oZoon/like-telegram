import { CHANNELS, USER_LIST } from "@/const"
import { MessageListItem } from "@/types"
import { DIALOGS } from "./dialogs"

export const TIME_START = 1687718670000

export const makeDialogs = () => {
  const result: MessageListItem[] = []
  let length = 0
  DIALOGS.forEach((item, index) => {
    const userIndexOrder = Math.floor(Math.random() * USER_LIST.length)
    length += item.length
    result.push({
      messageId: index,
      message: item,
      channelId: CHANNELS[0].id,
      replyMessageId: null,
      authorId: USER_LIST[userIndexOrder].id,
      timestamp: TIME_START + length,
      isDelete: false
    })
  })
  return result
}
