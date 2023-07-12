import { createReducer } from "@reduxjs/toolkit"

import { AppAction } from "../types"
import { actionAddNotification, actionDeleteNotification } from "./actions"

interface UserState {
  messageList: string[]
}

const initialState: UserState = {
  messageList: [],
}

export const reducerNotification = createReducer<UserState>(
  initialState,
  (builder) => {
    builder.addCase(
      actionAddNotification,
      (state, action: AppAction<string>) => {
        const list = [...state.messageList]
        list.unshift(action.payload)
        return {
          messageList: list,
        }
      }
    )
    builder.addCase(actionDeleteNotification, (state) => {
      const list = [...state.messageList]
      list.pop()
      return {
        messageList: list,
      }
    })
  }
)
