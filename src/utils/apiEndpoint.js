function isDevelopment() {
  if (process.env.NODE_ENV === "development") {
    return true
  } else {
    return false
  }
}

const apiEndpoint = isDevelopment()
  ? "https://payqart.compound.ng/api"
  : "https://payqart.compound.ng/api"

export default apiEndpoint
