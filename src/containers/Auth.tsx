import React from "react"
import { usePopperTooltip } from "react-popper-tooltip"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { USER_LIST } from "@/const"
import { AppDispatch } from "@/store"
import { userId, userLogin } from "@/store/modules/user"
import { colors } from "@/styles/colors"
import { H24TitleCSS, H14TitleCSS, Icon, Input, PopperToolTip } from "@/ui"

export const Auth = () => {
  const user = useSelector(userId)
  const [password, setPassword] = React.useState<string>("")
  const dispatch: AppDispatch = useDispatch()

  const handleSubmit = React.useCallback(
    () => dispatch(userLogin(password)),
    [dispatch, password]
  )

  const helpTooltip = usePopperTooltip({
    placement: "top",
  })

  if (user !== null) {
    return null
  }

  return (
    <Wrapper>
      <AuthWrapper>
        <HelpIcon>
          <PopperToolTip
            getArrowProps={helpTooltip.getArrowProps}
            getTooltipProps={helpTooltip.getTooltipProps}
            setTooltipRef={helpTooltip.setTooltipRef}
            tooltip={
              <HelpWrapper>
                <HelpTitle>Пароли для входа:</HelpTitle>
                <UserList>
                  {USER_LIST.map((item) => (
                    <UserItem key={item.id}>
                      <UserName>{item.nickname}:</UserName>
                      <UserPassword>{`'${item.password}'`}</UserPassword>
                    </UserItem>
                  ))}
                </UserList>
              </HelpWrapper>
            }
            visible={helpTooltip.visible}
          />
          <IconWrapper ref={helpTooltip.setTriggerRef}>
            <Icon icon="help" />
          </IconWrapper>
        </HelpIcon>
        <Title>Введите пароль</Title>
        <Input
          value={password}
          onChange={setPassword}
          onSubmit={handleSubmit}
          inputType="password"
        />
      </AuthWrapper>
    </Wrapper>
  )
}

const IconWrapper = styled.div`
  width: 16px;
`

const UserPassword = styled.div`
  ${H14TitleCSS}
`

const UserName = styled.div`
  ${H14TitleCSS}
`

const UserItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const HelpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 125px;
`

const HelpTitle = styled.div`
  ${H14TitleCSS}
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AuthWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  color: ${colors.black};
  border: 1px solid ${colors.black};
  box-shadow: ${colors.boxShadow} 0 2px 4px -1px,
    ${colors.boxShadowAuth[0]} 0 4px 5px 0,
    ${colors.boxShadowAuth[0]} 0 1px 10px 0;
`

const Title = styled.div`
  ${H24TitleCSS}
`

const HelpIcon = styled.div`
  position: absolute;
  width: 16px;
  right: 96px;
  top: 23px;
`
