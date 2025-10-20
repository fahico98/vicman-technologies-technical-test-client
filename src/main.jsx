import getXsrfTokenFromCookie from "@/utils/getXsrfTokenFromCookie.js"
import { getGlobalState, setGlobalState } from "@/state/globalState.js"
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

if (getXsrfTokenFromCookie() !== null) {
  await axios.get("me")
    .then(response => {
      console.log('From main.jsx:')
      console.log({response})
      setGlobalState("user", response.data.user)
    })
    .catch(error => {
      console.log('From main.jsx:')
      console.log(error)
    })
}

ReactDOM.createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
