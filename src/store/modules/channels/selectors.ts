import { AppRootState } from "../../index"

export const activeChannelIdSelector = (state: AppRootState) =>
  state.reducerChannels.activeChannel
export const channelsListSelector = (state: AppRootState) =>
  state.reducerChannels.channelList
