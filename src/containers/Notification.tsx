import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { AppDispatch } from "@/store"
import {
  deleteNotification,
  notificationListSelector,
} from "@/store/modules/notifications"
import { colors } from "@/styles/colors"
import { Button, H20TitleCSS, Icon } from "@/ui"

export const Notification = () => {
  const notifications = useSelector(notificationListSelector)
  const dispatch: AppDispatch = useDispatch()

  React.useEffect(() => {
    if (notifications.length >= 1) {
      setTimeout(() => dispatch(deleteNotification()), 3000)
    }
  }, [dispatch, notifications])

  if (notifications.length === 0) {
    return null
  }

  return (
    <Wrapper>
      {notifications.map((notification, index) => (
        <NotificationContainer key={index}>
          <NotificationMessage>{notification}</NotificationMessage>
          <Button onClick={() => dispatch(deleteNotification())} type="close">
            <Icon icon="cross" />
          </Button>
        </NotificationContainer>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.notificationBackground};
  padding: 12px 18px;
  margin: auto;
  margin-top: 19px;
  border-radius: 8px;
  border: 0;
  gap: 24px;
`

const NotificationMessage = styled.div`
  ${H20TitleCSS}
  color: ${colors.white};
`
