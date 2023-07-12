import { combineReducers } from "redux"

import { reducerChannels } from "./modules/channels/reducer"
import { reducerMessageList } from "./modules/message-list/reducer"
import { reducerUser } from "./modules/user/reducer"
import { reducerNotification } from "./modules/notifications/reducer"
import { reducerMessageInput } from "./modules/message-input/reducer"

export const rootReducer = combineReducers({
  reducerUser,
  reducerNotification,
  reducerChannels,
  reducerMessageList,
  reducerMessageInput,
})
