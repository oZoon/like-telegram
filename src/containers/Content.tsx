import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { userId } from "@/store/modules/user"
import { ChannelsList } from "./ChannelsList"
import { ChatList } from "./ChatList"
import { InputField } from "./InputField"

export const Content: React.FC = () => {
  const id = useSelector(userId)

  if (id === null) {
    return null
  }

  return (
    <Container>
      <ChannelsList />
      <ChatWrapper>
        <ChatList />
        <InputField />
      </ChatWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
`

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`
