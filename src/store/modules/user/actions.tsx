import { createAction } from "@reduxjs/toolkit"

import { USER_LIST } from "@/const"
import { AppDispatch } from "@/store"
import { setInitChannels } from "../channels"
import { actionAddNotification } from "../notifications"

const PREFIX = "USER"

// login
export const AUTHORISE_ACCEPT = `${PREFIX}/AUTHORISE_ACCEPT`
export const actionAuthAccept = createAction<number>(AUTHORISE_ACCEPT)
export const userLogin = (password: string) => (dispatch: AppDispatch) => {
  const user = USER_LIST.find((item) => item.password === password)
  if (user) {
    dispatch(actionAuthAccept(user.id))
  } else {
    dispatch(actionAddNotification("неправильный пароль"))
  }
}

// logout
export const USER_LOGOUT = `${PREFIX}/USER_LOGOUT`
export const actionLogout = createAction(USER_LOGOUT)
export const userLogout = (dispatch: AppDispatch) => {
  dispatch(actionLogout())
  dispatch(setInitChannels())
} 
