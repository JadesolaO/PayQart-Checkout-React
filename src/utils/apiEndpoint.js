function isDevelopment() {
  if (process.env.NODE_ENV === "development") {
    return true
  } else {
    return false
  }
}

const apiEndpoint = isDevelopment()
  ? "http://localhost:2000/user"
  : "https://payqart-demo.netlify.app"

export default apiEndpoint
