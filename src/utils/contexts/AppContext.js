import axios from "axios"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react"
import apiEndpoint from "../apiEndpoint"

import { useHistory } from "react-router-dom"

const AppContext = createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export function AppContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({})

  let history = useHistory()

  const getUser = useCallback(async () => {
    const token = localStorage.getItem("token")

    try {
      const response = await axios.get(`${apiEndpoint}/user/view`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { data } = response

      if (data.status === "success") {
        setUserDetails(data.user)
      }
    } catch (error) {
      console.log(error.response)
      history.push("/")
    }
  }, [history])

  useEffect(() => {
    getUser()
  }, [getUser])

  const value = { userDetails, setUserDetails }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
