import { colors } from "@/styles/colors"
import React from "react"
import styled, { css } from "styled-components"
import { H14TitleCSS } from "./typography"

type Props = {
  onClick: () => void
  children?: string | JSX.Element
  disabled?: boolean
  type?: string
}

export const Button: React.FC<Props> = ({
  onClick,
  children,
  disabled = false,
  type,
}) => (
  <Wrapper
    onClick={onClick}
    type="button"
    disabled={disabled}
    buttonType={type}
  >
    {children}
  </Wrapper>
)

type WrapperProps = {
  buttonType?: string
}

const Wrapper = styled.button<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  transition: all 0.15s linear;
  ${H14TitleCSS}
  height: 30px;
  padding: 6px 12px;
  margin: 0;
  border: 1px solid ${colors.gray};
  background-color: ${colors.transparent};
  color: ${colors.black};
  cursor: pointer;

  &:hover {
    background-color: ${colors.black};
    color: white;
    border: 1px solid ${colors.black};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${({ buttonType }) =>
    buttonType === "close" &&
    css`
      border: 0;

      &:hover {
        border: 0;
        background-color: ${colors.transparent};
      }
    `}

  ${({ buttonType }) =>
    buttonType === "logout" &&
    css`
      align-self: center;
      width: 100%;
      margin: 0;
      padding: 8px;
      cursor: pointer;
      color: ${colors.black};
      border: 0;
      background-color: ${colors.white};
      ${H14TitleCSS}

      &:hover {
        color: whitesmoke;
        background-color: ${colors.gray};
      }

      &:active,
      &:focus {
        outline: none;
      }
    `}
`
