import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Channels } from "@/components/Channels"
import { USER_LIST } from "@/const"
import { AppDispatch } from "@/store"
import {
  activeChannelIdSelector,
  changeChannel,
  channelsListSelector,
} from "@/store/modules/channels"
import { userId, userLogout } from "@/store/modules/user"

export const ChannelsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const channels = useSelector(channelsListSelector)
  const activeId = useSelector(activeChannelIdSelector)
  const id = useSelector(userId)
  const userName = React.useMemo(
    () => USER_LIST.find((item) => item.id === id)?.nickname || "ник",
    [id]
  )

  const handleChangeChannel = React.useCallback(
    (channelId: number) => dispatch(changeChannel(channelId)),
    [dispatch]
  )

  const handleLogout = React.useCallback(() => {
    dispatch(userLogout)
  }, [dispatch])

  return (
    <Channels
      channels={channels}
      active={activeId}
      onChangeChannel={handleChangeChannel}
      onLogout={handleLogout}
      userName={userName}
    />
  )
}
