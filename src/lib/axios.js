import getXsrfTokenFromCookie from "@/utils/getXsrfTokenFromCookie.js"
import router from "@/lib/router.js"
import axios from "axios"

const axiosInstance = axios.create({
  timeout: import.meta.env.VITE_SPA_REQUEST_TIMEOUT,
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  withXSRFToken: true
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          router.navigate("/ingreso")
          break
        case 419:
          router.navigate("/ingreso")
          break
        case 500:
          router.navigate("/ingreso")
          break
      }
    }

    return Promise.reject(error)
  }
)

if (import.meta.env.MODE !== "test") {
  axiosInstance.interceptors.request.use(config => {
    let xsrfToken = getXsrfTokenFromCookie()
    if (xsrfToken) config.headers["X-XSRF-TOKEN"] = xsrfToken
    config.headers["X-XSRF-TOKEN"] = xsrfToken
    return config
  })
}

export default axiosInstance
