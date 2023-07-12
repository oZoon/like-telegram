import { createAction } from "@reduxjs/toolkit"

import { AppDispatch } from "@/store"
import { ChannelItem } from "@/types"

const PREFIX = "CHANNELS"

// change channel
export const CHANGE_CHANNEL = `${PREFIX}/CHANGE_CHANNEL`
export const actionChangeChannel =
  createAction<ChannelItem["id"]>(CHANGE_CHANNEL)
export const changeChannel =
  (channelId: ChannelItem["id"]) => (dispatch: AppDispatch) =>
    dispatch(actionChangeChannel(channelId))

// create channel
export const CREATE_CHANNEL = `${PREFIX}/CREATE_CHANNEL`
export const actionCreateChannel = createAction<ChannelItem>(CREATE_CHANNEL)

// change subtitle channel
export const CHANGE_SUBTITLE = `${PREFIX}/CHANGE_SUBTITLE`
export const actionChangeSubtitleChannel =
  createAction<Omit<ChannelItem, "name">>(CHANGE_SUBTITLE)

// set initial
export const SET_INITIAL = `${PREFIX}/SET_INITIAL`
export const actionSetInitial = createAction(SET_INITIAL)
export const setInitChannels = () => (dispatch: AppDispatch) =>
  dispatch(actionSetInitial())
