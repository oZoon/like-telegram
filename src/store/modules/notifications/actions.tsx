import { createAction } from "@reduxjs/toolkit"

import { AppDispatch } from "@/store"

const PREFIX = "NOTIFICATION"

// add notification
export const ADD_NOTIFICATION = `${PREFIX}/ADD_NOTIFICATION`
export const actionAddNotification = createAction<string>(ADD_NOTIFICATION)
export const addNotification = (message: string) => (dispatch: AppDispatch) =>
  dispatch(actionAddNotification(message))

// delete notification
export const DELETE_NOTIFICATION = `${PREFIX}/DELETE_NOTIFICATION`
export const actionDeleteNotification = createAction(DELETE_NOTIFICATION)
export const deleteNotification = () => (dispatch: AppDispatch) =>
  dispatch(actionDeleteNotification())
