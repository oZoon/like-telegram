import React from "react"
import { usePopperTooltip } from "react-popper-tooltip"
import styled, { css } from "styled-components"

import { CHANNEL_WIDTH, WINDOW_WIDTH } from "@/const"
import { formatDate } from "@/helpers/formatDate"
import { MONTH_NAME } from "@/helpers/monthName"
import { colors } from "@/styles/colors"
import { FormatMessageItem } from "@/types"
import { H12TitleCSS, H14TitleCSS, H32TitleCSS, Icon, PopperToolTip } from "@/ui"

export const Message: React.FC<FormatMessageItem> = ({
  timestamp,
  message,
}) => {
  const date = new Date(timestamp)
  const [visible, setVisible] = React.useState<boolean>(false)

  const settingsTooltip = usePopperTooltip({
    placement: "top",
    trigger: "click",
    visible,
    onVisibleChange: setVisible,
  })

  if (message === null) {
    return (
      <Wrapper>
        <DateText>{`${date.getDate()} ${
          MONTH_NAME[date.getMonth()]
        }`}</DateText>
      </Wrapper>
    )
  }

  if (message !== null) {
    return (
      <Wrapper isMessage isPreviuosSameAuthor={message.isPreviuosSameAuthor}>
        {message.avatar === null && <AvatarEmpty />}
        {message.avatar !== null && <Avatar>{message.avatar}</Avatar>}
          <MessageItem
            isActiveUser={message.isActiveUser}
            isPreviuosSameAuthor={message.isPreviuosSameAuthor}
          >
            {message.reply !== null && (
              <MessageReplyWrapper>
                <ReplyUserName>{message.reply.authorName}</ReplyUserName>
                <ReplyMessage>{message.reply.message.substring(0, 100)}...</ReplyMessage>
              </MessageReplyWrapper>
            )}
            {message.userName && <UserName>{message.userName}</UserName>}
            {message.message}
            <MessageTime>{formatDate(timestamp)}</MessageTime>

            <PopperToolTip
              getArrowProps={settingsTooltip.getArrowProps}
              getTooltipProps={settingsTooltip.getTooltipProps}
              setTooltipRef={settingsTooltip.setTooltipRef}
              tooltip={
                <SettingsWrapper>
                  {message.actions.onEdit !== null && (
                    <ActionText
                      onClick={() => {
                        message.actions.onEdit !== null
                          ? message.actions.onEdit()
                          : undefined
                        setVisible(false)
                      }}
                    >
                      редактировать
                    </ActionText>
                  )}
                  {message.actions.onPublicReply !== null && (
                    <ActionText
                      onClick={() => {
                        message.actions.onPublicReply !== null
                          ? message.actions.onPublicReply()
                          : undefined
                        setVisible(false)
                      }}
                    >
                      ответить
                    </ActionText>
                  )}
                  {message.actions.onPrivateReply !== null && (
                    <ActionText
                      onClick={() => {
                        message.actions.onPrivateReply !== null
                          ? message.actions.onPrivateReply()
                          : undefined
                        setVisible(false)
                      }}
                    >
                      ответить приватно
                    </ActionText>
                  )}
                  {message.actions.onDelete !== null && (
                    <ActionText
                      onClick={() => {
                        message.actions.onDelete !== null
                          ? message.actions.onDelete()
                          : undefined
                        setVisible(false)
                      }}
                    >
                      удалить
                    </ActionText>
                  )}
                </SettingsWrapper>
              }
              visible={settingsTooltip.visible}
            />
            <IconWrapper ref={settingsTooltip.setTriggerRef}>
              <Icon icon="settings" />
            </IconWrapper>
          </MessageItem>
      </Wrapper>
    )
  }
}

const MessageReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
`

const ReplyUserName = styled.span`
  ${H14TitleCSS}
  font-weight: 600;
`

const ReplyMessage = styled.span`
  ${H14TitleCSS}
`

const IconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const ActionText = styled.span`
  ${H12TitleCSS}
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.15s linear;

  &:hover {
    background-color: ${colors.bisque};
  }
`

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const MessageTime = styled.time`
  position: absolute;
  right: 8px;
  bottom: 8px;
  ${H12TitleCSS}
`

const UserName = styled.span`
  position: absolute;
  top: 10px;
  ${H14TitleCSS}
  font-weight: 600;
`

type WrapperProps = {
  isMessage?: boolean
  isPreviuosSameAuthor?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 8px;
  gap: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  ${({ isMessage }) =>
    isMessage &&
    css`
      justify-content: flex-start;
      align-items: flex-end;
      margin-top: 8px;
    `}

  ${({ isPreviuosSameAuthor }) =>
    isPreviuosSameAuthor
      ? css`
          margin-top: 2px;
        `
      : css`
          margin-top: 8px;
        `}
`

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  min-height: 40px;
  max-width: 40px;
  text-align: center;
  border-radius: 50%;
  background: linear-gradient(90deg, ${colors.avatar[0]}, ${colors.avatar[1]});
  ${H32TitleCSS}
  color: ${colors.light};
`

const AvatarEmpty = styled.div`
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  min-height: 40px;
  max-width: 40px;
`

const DateText = styled.span`
  width: auto;
  margin: 8px auto;
  padding: 6px 12px;
  cursor: default;
  border: 0;
  border-radius: 14px;
  background-color: ${colors.dateBackground};
  ${H14TitleCSS}
  font-weight: 600;
  color: ${colors.light};
`

type MessageItemProps = {
  isActiveUser: boolean
  isPreviuosSameAuthor: boolean
}

const MessageItem = styled.div<MessageItemProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  padding: 20px;
  ${H14TitleCSS}
  line-height: 18px;
  position: relative;
  border: 0;
  border-radius: 8px;
  min-height: 25px;
  padding-right: 28px;

  background-color: ${colors.messageBackground};
  ${({ isActiveUser }) =>
    isActiveUser &&
    css`
      background-color: ${colors.messageBackgroundSelf};
      padding-top: 4px;
    `}

  ${({ isPreviuosSameAuthor }) =>
    isPreviuosSameAuthor &&
    css`
      padding-top: 2px;
    `}
  
  ${({ isPreviuosSameAuthor, isActiveUser }) =>
    !isPreviuosSameAuthor &&
    !isActiveUser &&
    css`
      padding-top: 28px;
    `}

  -webkit-box-shadow: inset 0 0 10px ${colors.boxShadow};
  box-shadow: inset 0 0 10px ${colors.boxShadow};

  width: calc((100% - ${`${CHANNEL_WIDTH.biggest}px`}) / 2);

  @media (max-width: ${WINDOW_WIDTH.smallDesktop - 1}px) {
    width: 100%;
  }
`
