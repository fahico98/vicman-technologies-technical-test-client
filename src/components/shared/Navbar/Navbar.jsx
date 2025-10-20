import { useGlobalState, setGlobalState } from "@/state/globalState.js"
import { Link, useNavigate } from "react-router-dom"
import { useThemeMode } from "flowbite-react"
import { Button } from "flowbite-react"
import axios from "@/lib/axios.js"

export function Navbar() {
  const [user] = useGlobalState("user")
  const navigate = useNavigate()
  const { mode, toggleMode } = useThemeMode()
  
  async function handleLogOut(event) {
    event.preventDefault()
    await axios.post("/logout").then(response => {
      if (response.status >= 200 && response.status < 300) {
        setGlobalState("user", null)
        navigate("/")
      }
    })
  }
  
  return (
    <nav>
      <div className="flex max-width padding-x justify-between items-center relative w-full h-14 sm:h-20 py-2">
        <div className="w-1/2 flex justify-start items-center p-0">
          <Link to={"/"} className="text-base sm:text-lg md:text-xl font-sans font-medium text-blue-600">
            <i className="bi bi-eyeglasses mr-2"></i>Biblioteca
          </Link>
        </div>
          {
            user !== null
              ? (
                <div className="w-1/2 flex justify-end items-center gap-x-8 p-0">
                  <Link to={"/libros"} className="text-xs sm:text-sm md:text-base font-sans font-medium text-blue-600"><i className="bi bi-book mr-2"></i>Libros</Link>
                  <Link to={"/autores"} className="text-xs sm:text-sm md:text-base font-sans font-medium text-blue-600"><i className="bi bi-person mr-2"></i>Autores</Link>
                  <a href="#" onClick={(event) => handleLogOut(event)} className="text-xs sm:text-sm md:text-base font-sans font-medium text-blue-600">
                    <i className="bi bi-box-arrow-right mr-2"></i>Cerrar sesión
                  </a>
                  <Button className="btn-default" size="sm" onClick={() => toggleMode()}><i className={`bi ${mode === 'light' ? 'bi-moon-stars' : 'bi-sun'}`}></i></Button>
                </div>
              )
              : (
                <div className="w-1/2 flex justify-end items-center gap-x-8 p-0">
                  <Link to={"/ingreso"} className="text-xs sm:text-sm md:text-base font-sans font-medium text-blue-600"><i className="bi bi-box-arrow-in-right mr-2"></i>Iniciar sesión</Link>
                  <Link to={"/registro"} className="text-xs sm:text-sm md:text-base font-sans font-medium text-blue-600"><i className="bi bi-pen mr-2"></i>Registrarse</Link>
                  <Button className="btn-default" size="sm" onClick={() => toggleMode()}><i className={`bi ${mode === 'light' ? 'bi-moon-stars' : 'bi-sun'}`}></i></Button>
                </div>
              )
          }
      </div>
    </nav>
  )
}