/* eslint-disable react/display-name */
import React from "react"
import { Scrollbar } from "react-scrollbars-custom"
import styled from "styled-components"

import { formatMessageList } from "@/helpers/formatMessageList"
import { ChannelItem, EditItem, MessageListItem, ReplyItem } from "@/types"
import { Message } from "./Message"

type Props = {
  list: MessageListItem[]
  onEdit: (message: EditItem) => void
  onReply: (replyItem: ReplyItem, channel: ChannelItem) => void
  onDelete: (messageId: number) => void
  channelId: number
  userId: number | null
  channels: ChannelItem[]
  isReply: boolean
  allList: MessageListItem[]
}

export const Chat = React.memo(
  ({
    list,
    onEdit,
    onReply,
    onDelete,
    channelId,
    userId,
    channels,
    isReply,
    allList,
  }: Props) => {
    const myRef = React.createRef<HTMLDivElement>()
    const formattedList = formatMessageList({
      list,
      channelId,
      userId,
      channels,
      allList,
      onEdit,
      onReply,
      onDelete,
    })

    console.log("! formattedList", formattedList)

    React.useEffect(() => {
      myRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [formattedList, myRef])

    return (
      <Wrapper isReply={isReply}>
        <Scrollbar>
          {formattedList.map((item, index) => (
            <Message key={index} {...item} />
          ))}
          <div ref={myRef} />
        </Scrollbar>
      </Wrapper>
    )
  }
)

type WrapperProps = {
  isReply: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - ${({ isReply }) => (isReply ? "100px" : "46px")});
`
