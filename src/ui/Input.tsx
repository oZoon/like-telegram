import React from "react"
import styled, { css } from "styled-components"

import { colors } from "@/styles/colors"
import { Button } from "./Button"
import { H14TitleCSS } from "./typography"

type InputProps = {
  value: string
  onChange: (str: string) => void
  onSubmit: () => void
  inputType: "password" | "text"
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onSubmit,
  inputType,
}) => {
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit()
    },
    [onSubmit]
  )

  return (
    <InputWrapper onSubmit={handleSubmit} isText={inputType === "text"}>
      <InputField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputType={inputType}
        type={inputType}
      />
      <Button onClick={onSubmit}>Отправить</Button>
    </InputWrapper>
  )
}

type InputWrapperProps = {
  isText: boolean
}

const InputWrapper = styled.form<InputWrapperProps>`
  display: flex;
  align-items: center;
  gap: 12px;

  ${({ isText }) =>
    isText &&
    css`
      width: 100%;
    `}
`

type InputFieldProps = {
  inputType: "password" | "text"
}

const InputField = styled.input<InputFieldProps>`
  padding: 6px 12px;
  border: 1px solid ${colors.gray};
  ${H14TitleCSS}
  height: 30px;
  box-sizing: border-box;

  &:active,
  &:focus {
    border: 1px solid ${colors.gray};
    outline: none;
  }

  ${({ inputType }) =>
    inputType === "password" &&
    css`
      width: 250px;
    `}

  ${({ inputType }) =>
    inputType === "text" &&
    css`
      width: 100%;
    `}
`
