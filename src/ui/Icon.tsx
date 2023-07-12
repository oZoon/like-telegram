/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"

import Cross from "./icons/cross.svg"
import Help from "./icons/help.svg"
import Settings from "./icons/settings.svg"

const Icons = {
  help: Help,
  cross: Cross,
  settings: Settings,
}

type Props = {
  icon: IconName
  onClick?: () => void
}

export type IconName = keyof typeof Icons

export const Icon = ({ icon, onClick }: Props) => {
  const Component = Icons[icon]
  return <Component onClick={onClick} />
}
