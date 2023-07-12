import React from "react"
import styled, { css } from "styled-components"

import { CHANNEL_WIDTH, WINDOW_WIDTH } from "@/const"
import { useWindowWidth } from "@/helpers/useWindowWidth"
import { colors } from "@/styles/colors"
import { MessageListItem, UserItem } from "@/types"
import { H14TitleCSS, Icon, Input } from "@/ui"

type Props = {
  replyData: {
    user: UserItem
    message: MessageListItem
  } | null
  partialData: string | null
  editData: {
    user: UserItem
    message: MessageListItem
  } | null
  onCloseReply: () => void
  onCloseEdit: () => void
  onInputSubmit: () => void
  onSavePartialMessage: (text: string) => void
}

export const InputArea: React.FC<Props> = ({
  replyData,
  partialData,
  editData,
  onCloseReply,
  onCloseEdit,
  onInputSubmit,
  onSavePartialMessage,
}) => {
  const width = useWindowWidth()

  return (
    <Wrapper isReply={Boolean(replyData) || Boolean(editData)}>
      {replyData && (
        <TopWrapper>
          <IconWrapper onClick={onCloseReply}>
            <Icon icon="cross" />
          </IconWrapper>
          <ReplyUser>{replyData.user.nickname}</ReplyUser>
          <ReplyMessage calc={width}>{replyData.message.message}</ReplyMessage>
        </TopWrapper>
      )}
      {editData && (
        <TopWrapper>
          <IconWrapper onClick={onCloseEdit}>
            <Icon icon="cross" />
          </IconWrapper>
          <ReplyUser>{editData.user.nickname}</ReplyUser>
          <ReplyMessage calc={width}>{editData.message.message}</ReplyMessage>
        </TopWrapper>
      )}
      <Input
        value={partialData || ""}
        onChange={onSavePartialMessage}
        onSubmit={() => onInputSubmit()}
        inputType="text"
      />
    </Wrapper>
  )
}

const TopWrapper = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  gap: 8px;
  margin-top: 8px;
`

const ReplyUser = styled.div`
  ${H14TitleCSS}
  font-weight: 600;
  color: ${colors.blue};
`

type ReplyMessageProps = {
  calc: number | null
}

const ReplyMessage = styled.div<ReplyMessageProps>`
  ${H14TitleCSS}

  width: ${({ calc }) => (calc === null ? 900 : calc - 498)}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${WINDOW_WIDTH.bigDesktop - 1}px) {
    width: ${({ calc }) =>
      calc === null ? 900 : calc - 198 - CHANNEL_WIDTH.bigDesktop}px;
  }

  @media (max-width: ${WINDOW_WIDTH.desktop - 1}px) {
    width: ${({ calc }) =>
      calc === null ? 900 : calc - 198 - CHANNEL_WIDTH.desktop}px;
  }

  @media (max-width: ${WINDOW_WIDTH.smallDesktop - 1}px) {
    width: ${({ calc }) =>
      calc === null ? 900 : calc - 198 - CHANNEL_WIDTH.smallDesktop}px;
  }

  @media (max-width: ${WINDOW_WIDTH.tablet - 1}px) {
    width: ${({ calc }) =>
      calc === null ? 900 : calc - 198 - CHANNEL_WIDTH.tablet}px;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 0;
  cursor: pointer;
`

type WrapperProps = {
  isReply: boolean
}

const Wrapper = styled.div<WrapperProps>`
  margin: 0 20px 0 60px;

  ${({ isReply }) =>
    isReply
      ? css`
          height: 100px;
          gap: 12px;
        `
      : css`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 46px;
        `}

  box-sizing: border-box;
`
