import getXsrfTokenFromCookie from "@/utils/getXsrfTokenFromCookie.js"
import { setGlobalState } from "@/state/globalState.js"
import { RouterProvider } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css"
import ReactDOM from "react-dom/client"
import router from "@/lib/router.js"
import axios from "@/lib/axios.js"
import "@/styles/index.css"
import React from "react"

if (localStorage.getItem("flowbite-theme-mode") === null) {
  localStorage.setItem("flowbite-theme-mode", "light")
  document.documentElement.classList.remove("dark")
  document.documentElement.classList.add("light")
} else {
  document.documentElement.classList.remove("light")
  document.documentElement.classList.remove("dark")
  document.documentElement.classList.add(localStorage.getItem("flowbite-theme-mode"))
}

function deleteXsrfTokenCookie() {
  document.cookie = "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}


if (getXsrfTokenFromCookie() !== null) {
  await axios.get("me")
    .then(response => {
      if (response.status >= 200 && response.status < 300 && response.data.user) {
        console.log('response.data.user', response.data.user)
        setGlobalState("user", response.data.user)
        if (window.location.pathname !== "/libros") {
          router.navigate("/libros")
        }
      }
    })
    .catch(error => {
      setGlobalState("user", null)
      deleteXsrfTokenCookie()
      console.log(error)
    })
}

ReactDOM.createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
