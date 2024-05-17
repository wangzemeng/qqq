import axios from "axios"
import qs from "querystringify"

let apiContextPath = ""
const onlineDevelopmentMode = process.env.VUE_APP_ONLINE_DEVELOPMENT_MODE === "true" || process.env.REACT_APP_ONLINE_DEVELOPMENT_MODE === "true"
if (process.env.NODE_ENV === "development" && !onlineDevelopmentMode) {
  document.cookie =
    "token=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY0NjcyMjI2ODY4NSwidXNlcklkIjoiMTIzNDU2Nzg5MCJ9.F8wr84ha-dW18J9wZOQeTXj55mXTdqKfLBeNlNueoLY"
  document.cookie =
    "refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY0NjcyMjI2ODY4Nn0.TEVE_nopHNZlvSQM_RUZrLcCzkaERiHo8nz0q-ksL3E"
  document.cookie = "username=admin"
  document.cookie = "windowOnline=true"
  apiContextPath = "/api"
}
export const getInstance = (prefix = "") => {
  if (prefix) {
    prefix.startsWith("/") && (prefix = prefix.slice(1, prefix.length))
    prefix.endsWith("/") && (prefix = prefix.slice(0, -1))
  }
  const instance = axios.create({
    baseURL: `${apiContextPath}/${prefix ? prefix + "/" : ""}sdata/rest`,
    timeout: 60000,
    validateStatus: function(status) {
      return status >= 200 && status < 300 // default
    },
    headers:
      (window.location.search && qs.parse(window.location.search).token) ||
      window.token
        ? { token: qs.parse(window.location.search).token || window.token }
        : {}
  })

  instance.defaults.headers.post["Content-Type"] = "application/json"

  instance.interceptors.response.use(
    response => {
      let { data } = response
      if (typeof data === "string") {
        data = JSON.parse(data)
      }
      if (data && data.status !== 200 && !(data instanceof Blob)) {
        return Promise.reject(response)
      }
      if (data instanceof Blob) {
        response.data = data
        return response
      }

      response.data = data && data.result
      return response
    },
    error => {
      if (error.response && error.response.status === 401) {
        return
      }

      return Promise.reject(error.response)
    }
  )
  return instance
}
let prefixPath = window.prefixPath || ""

export default getInstance(prefixPath)
