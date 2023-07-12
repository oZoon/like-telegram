import React from "react"

import { Auth, Content, Notification } from "@/containers"

export const Page: React.FC = () => {
  return (
    <>
      <Auth />
      <Content />
      <Notification />
    </>
  )
}
