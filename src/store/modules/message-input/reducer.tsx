import { createReducer } from "@reduxjs/toolkit"

import { EditItem, PartialItem, ReplyItem } from "@/types"
import { AppAction } from "../types"
import {
  actionMountEdit,
  actionMountReply,
  actionSavePartMessage,
  actionUnmountEdit,
  actionUnmountReply,
} from "./actions"

export interface MessageInputState {
  replyList: ReplyItem[]
  partialMessageList: PartialItem[]
  editMessageList: EditItem[]
}

const initialState: MessageInputState = {
  replyList: [],
  partialMessageList: [],
  editMessageList: [],
}

export const reducerMessageInput = createReducer<MessageInputState>(
  initialState,
  (builder) => {
    builder
      .addCase(actionMountReply, (state, action: AppAction<ReplyItem>) => {
        const list = [...state.replyList]
        const index = list.findIndex(
          (item) => item.channelId === action.payload.channelId
        )
        if (index !== -1) {
          list.splice(index, 1, action.payload)
          return {
            ...state,
            replyList: list,
          }
        }
        return {
          ...state,
          replyList: state.replyList.concat(action.payload),
        }
      })
      .addCase(
        actionUnmountReply,
        (state, action: AppAction<ReplyItem["channelId"]>) => {
          const list = [...state.replyList]
          const index = list.findIndex(
            (item) => item.channelId === action.payload
          )
          if (index !== -1) {
            list.splice(index, 1)
            return {
              ...state,
              replyList: list,
            }
          }
          return { ...state }
        }
      )
      .addCase(
        actionSavePartMessage,
        (state, action: AppAction<PartialItem>) => {
          const list = [...state.partialMessageList]
          const index = list.findIndex(
            (item) => item.channelId === action.payload.channelId
          )
          if (index !== -1) {
            if (action.payload.text === "") {
              list.splice(index, 1)
              return {
                ...state,
                partialMessageList: list,
              }
            }
            list.splice(index, 1, action.payload)
            return {
              ...state,
              partialMessageList: list,
            }
          }
          return {
            ...state,
            partialMessageList: state.partialMessageList.concat(action.payload),
          }
        }
      )
      .addCase(actionMountEdit, (state, action: AppAction<EditItem>) => {
        const list = [...state.editMessageList]
        const index = list.findIndex(
          (item) => item.channelId === action.payload.channelId
        )
        if (index !== -1) {
          list.splice(index, 1, action.payload)
          return {
            ...state,
            editMessageList: list,
          }
        }
        return {
          ...state,
          editMessageList: state.editMessageList.concat(action.payload),
        }
      })
      .addCase(
        actionUnmountEdit,
        (state, action: AppAction<EditItem["channelId"]>) => {
          const list = [...state.editMessageList]
          const index = list.findIndex(
            (item) => item.channelId === action.payload
          )
          if (index !== -1) {
            list.splice(index, 1)
            return {
              ...state,
              editMessageList: list,
            }
          }
          return { ...state }
        }
      )
  }
)
