import React from "react"
import { Provider } from "react-redux"

import store from "./store"
import { Page } from "./pages"
import './styles/main.css'

export const App: React.FC = () => (
  <Provider store={store}>
    <Page />
  </Provider>
)
