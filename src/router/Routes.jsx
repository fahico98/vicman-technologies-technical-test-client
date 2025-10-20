import { Error404 } from "@/views/Error404/Error404.jsx"
import { Register } from "@/views/Register/Register.jsx"
import { Authors } from "@/views/Authors/Authors.jsx"
import { Login } from "@/views/Login/Login.jsx"
import { Books } from "@/views/Books/Books.jsx"
import { Home } from "@/views/Home/Home.jsx"
import { Root } from "@/router/Root.jsx"

function Routes() {
  return [
    {
      path: "/",
      element: <Root />,
      errorElement: <Error404 />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/ingreso",
          element: <Login />
        },
        {
          path: "/registro",
          element: <Register />
        },
        {
          path: "/libros",
          element: <Books />
        },
        {
          path: "/autores",
          element: <Authors />
        }
      ]
    }
  ]
}

export { Routes }
