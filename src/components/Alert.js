import React from "react"
import "../stylesheets/scss/index.css"
import { X } from "react-feather"

const Alert = () => {
  return (
    <div className="custom-alert bg-danger d-flex justify-content-between align-items-center">
      <span>Login successful</span>
      <X size="18" strokeWidth="2" style={{ marginLeft: "40px" }} />
    </div>
  )
}

export default Alert
