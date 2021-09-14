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
  const [products, setProducts] = useState([])

  const getUser = useCallback(async () => {
    const token = localStorage.getItem("token")

    if (!token) return

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

  const orderId = localStorage.getItem("orderId")

  const getOrder = useCallback(async () => {
    if (orderId) {
      try {
        const response = await axios.post(`${apiEndpoint}/order/one`, {
          orderId
        })

        const { data } = response

        if (data.status === "success") {
          setProducts(data.data.products)
        }
      } catch (error) {
        console.log(error.response)
      }
    }
  }, [orderId])

  useEffect(() => {
    getOrder()
    getUser()
  }, [getOrder, getUser])

  const value = {
    userDetails,
    setUserDetails,
    selection,
    setSelection,
    products
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
