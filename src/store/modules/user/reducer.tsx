import { createReducer } from "@reduxjs/toolkit"

import { AppAction } from "../types"
import { actionAuthAccept, actionLogout } from "./actions"

interface UserState {
  userId: number | null
}

const initialState: UserState = {
  userId: null,
}

export const reducerUser = createReducer<UserState>(initialState, (builder) => {
  builder
    .addCase(actionAuthAccept, (_, action: AppAction<number>) => ({
      userId: action.payload,
    }))
    .addCase(actionLogout, () => ({
      userId: null,
    }))
})
