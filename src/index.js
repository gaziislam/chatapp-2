import React from "react"
import ReactDOM from "react-dom/client"
import firebaseConfig from "./firebaseConfig"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./style.css"
import store from "./store"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
