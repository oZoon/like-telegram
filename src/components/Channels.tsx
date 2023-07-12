import React from "react"
import styled, { css } from "styled-components"

import { CHANNEL_WIDTH, WINDOW_WIDTH } from "@/const"
import { colors } from "@/styles/colors"
import { ChannelItem } from "@/types"
import { Button, H14TitleCSS } from "@/ui"

type Props = {
  channels: ChannelItem[]
  active: number
  onChangeChannel: (channelId: number) => void
  onLogout: () => void
  userName: string
}

export const Channels: React.FC<Props> = ({
  channels,
  active,
  onChangeChannel,
  onLogout,
  userName,
}) => {
  return (
    <Wrapper>
      <Button onClick={onLogout} type="logout">
        {userName}
      </Button>
      {channels.map((item) => (
        <Channel
          isActive={item.id === active}
          key={item.id}
          onClick={() => onChangeChannel(item.id)}
        >
          <ChannelTitle>{item.name}</ChannelTitle>
          <ChannelTitle>{item.subName}</ChannelTitle>
        </Channel>
      ))}
    </Wrapper>
  )
}

const media = css`
  width: ${CHANNEL_WIDTH.biggest}px;
  min-width: ${CHANNEL_WIDTH.biggest}px;

  @media (max-width: ${WINDOW_WIDTH.bigDesktop - 1}px) {
    width: ${CHANNEL_WIDTH.bigDesktop}px;
    min-width: ${CHANNEL_WIDTH.bigDesktop}px;
  }

  @media (max-width: ${WINDOW_WIDTH.desktop - 1}px) {
    width: ${CHANNEL_WIDTH.desktop}px;
    min-width: ${CHANNEL_WIDTH.desktop}px;
  }

  @media (max-width: ${WINDOW_WIDTH.smallDesktop - 1}px) {
    width: ${CHANNEL_WIDTH.smallDesktop}px;
    min-width: ${CHANNEL_WIDTH.smallDesktop}px;
  }

  @media (max-width: ${WINDOW_WIDTH.tablet - 1}px) {
    width: ${CHANNEL_WIDTH.tablet}px;
    min-width: ${CHANNEL_WIDTH.tablet}px;
  }
`

const ChannelTitle = styled.span`
  ${H14TitleCSS}
  display: inline-block;
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;

  ${media}
`

type ChannelItemProps = {
  isActive: boolean
}

const Channel = styled.span<ChannelItemProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  min-height: 40px;
  gap: 4px;
  cursor: pointer;
  text-decoration: none;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${colors.bisque};
    `}
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
