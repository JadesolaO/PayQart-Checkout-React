import { toast } from "react-toastify"
import http from "./httpService"

// const isDevelopment = () => process.env.NODE_ENV !== "production"

const apiEndpoint = "https://cryptic-reef-51266.herokuapp.com/user"

export async function doLogin(user) {
  return await http.post(`${apiEndpoint}/login`, user)
}

export async function doPasswordReset(email) {
  return await http.post(`${apiEndpoint}/reset-pin`, email)
}

export async function doSignUp(user) {
  return await http.post(`${apiEndpoint}/signUp`, user)
}

export function successToast(msg) {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined
  })
}
