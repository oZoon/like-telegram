/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import styled from "styled-components"

import { colors } from "@/styles/colors"
import { H12TitleCSS } from "./typography"

type Props = {
  setTooltipRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  getTooltipProps: (params?: any) => any
  getArrowProps: (params?: any) => any
  tooltip: string | JSX.Element
  visible: boolean
}

export const PopperToolTip = ({
  getArrowProps,
  getTooltipProps,
  setTooltipRef,
  tooltip,
  visible,
}: Props) => {
  if (!visible) return null
  return (
    <Tooltip ref={setTooltipRef} {...getTooltipProps()}>
      <ToolTipArrow {...getArrowProps()} />
      {tooltip}
    </Tooltip>
  )
}

const Tooltip = styled.div`
  padding: 8px;
  background-color: ${colors.white};
  ${H12TitleCSS}
  line-height: 16px;
  font-weight: 300;
  color: ${colors.black};

  filter: drop-shadow(0px 4px 20px ${colors.popper});
  z-index: 5;
`

const ToolTipArrow = styled.span``
