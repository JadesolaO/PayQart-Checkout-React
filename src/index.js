import React from "react"
import ReactDOM from "react-dom"
// import { Provider } from "react-redux"
// import store from "./store"
import "./stylesheets/css/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App"
import { AppContextProvider } from "./utils/contexts/AppContext"
import { BrowserRouter, Switch } from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)
