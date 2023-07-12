import { AppRootState } from "../../index"

export const messageListSelector = (state: AppRootState) => state.reducerMessageList.list
