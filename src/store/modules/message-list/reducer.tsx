import { createReducer } from "@reduxjs/toolkit"

import { MessageListItem } from "@/types"
import { AppAction } from "../types"
import {
  actionAddMessage,
  actionDeleteMessage,
  actionEditMessage,
} from "./actions"
import { makeDialogs } from "./helper"

export interface MessageListState {
  list: MessageListItem[]
}

const initialState: MessageListState = {
  list: makeDialogs(),
}

export const reducerMessageList = createReducer<MessageListState>(
  initialState,
  (builder) =>
    builder
      .addCase(
        actionAddMessage,
        (state, action: AppAction<MessageListItem>) => {
          const list = [...state.list]
          list.push(action.payload)
          return { list }
        }
      )
      .addCase(
        actionEditMessage,
        (state, action: AppAction<{ messageId: number; text: string }>) => {
          const list = [...state.list]
          const index = list.findIndex(
            (item) => item.messageId === action.payload.messageId
          )
          if (index !== -1) {
            return {
              list: list.map((item, i) =>
                i === index ? { ...item, message: action.payload.text } : item
              ),
            }
          }
          return { ...state }
        }
      )
      .addCase(actionDeleteMessage, (state, action: AppAction<number>) => ({
        list: state.list.map((item) =>
          item.messageId === action.payload ? { ...item, isDelete: true } : item
        ),
      }))
)
