import { createReducer } from "@reduxjs/toolkit"

import { CHANNELS } from "@/const"
import { ChannelItem } from "@/types"
import { AppAction } from "../types"
import {
  actionChangeChannel,
  actionChangeSubtitleChannel,
  actionCreateChannel,
  actionSetInitial,
} from "./actions"

export interface ChannelsState {
  channelList: ChannelItem[]
  activeChannel: ChannelItem["id"]
}

export const initialChannelState: ChannelsState = {
  channelList: CHANNELS,
  activeChannel: CHANNELS[0].id,
}

export const reducerChannels = createReducer<ChannelsState>(
  initialChannelState,
  (builder) => {
    builder
      .addCase(
        actionChangeChannel,
        (state, action: AppAction<ChannelItem["id"]>) => {
          if (state.channelList.some((item) => item.id === action.payload)) {
            return {
              ...state,
              activeChannel: action.payload,
            }
          }
          return { ...state }
        }
      )
      .addCase(actionCreateChannel, (state, action: AppAction<ChannelItem>) => {
        if (!state.channelList.some((item) => item.id === action.payload.id)) {
          return {
            activeChannel: action.payload.id,
            channelList: state.channelList.concat(action.payload),
          }
        }
        return { ...state, activeChannel: action.payload.id }
      })
      .addCase(
        actionChangeSubtitleChannel,
        (state, action: AppAction<Omit<ChannelItem, "name">>) => {
          const list = [...state.channelList]
          const index = list.findIndex((item) => item.id === action.payload.id)
          if (index !== -1 && action.payload.subName !== "") {
            return {
              ...state,
              channelList: list.map((item, i) =>
                i === index
                  ? { ...item, subName: action.payload.subName }
                  : item
              ),
            }
          }
          return { ...state }
        }
      )
      .addCase(actionSetInitial, () => ({
        ...initialChannelState,
      }))
  }
)
