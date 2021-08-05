import axios from "axios"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react"
import apiEndpoint from "../apiEndpoint"

const AppContext = createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export function AppContextProvider({ children }) {
  const [selection, setSelection] = useState("")
  const [userDetails, setUserDetails] = useState({})

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
      //   history.push("/")
    }
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  const value = { userDetails, setUserDetails, selection, setSelection }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
