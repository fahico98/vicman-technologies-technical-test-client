import { DarkThemeToggle } from "flowbite-react"
import { useThemeMode } from 'flowbite-react'
import { Button } from "flowbite-react"
import { Link } from "react-router-dom"
// import { useState } from "react"

export function Navbar() {
  const { mode, toggleMode } = useThemeMode()
  // const [hasTransparentNavbar, setHasTransparentNavbar] = useState(true)
  // const [onTop, setOnTop] = useState(true)
  
  const NAVBAR_CLASSES = "w-full flex justify-center fixed top-0 left-0 right-0 transition duration-300 p-0 z-10"
  // const NAVBAR_SHADOW_CLASS = `${hasTransparentNavbar && onTop ? "drop-shadow-none bg-transparent" : "drop-shadow-md bg-white"}`
  const NAVBAR_SHADOW_CLASS = "drop-shadow-md bg-white"
  
  return (
    <nav>
      <div className="flex max-width padding-x justify-between items-center relative w-full h-14 sm:h-20 py-2">
        <div className="w-1/2 flex justify-start items-center p-0">
          <Link to={"/"} className="text-base sm:text-lg md:text-xl font-sans font-medium text-blue-600">
            <i className="bi bi-eyeglasses"></i>&nbsp;Biblioteca
          </Link>
        </div>
        <div className="w-1/2 flex justify-end items-center gap-x-6 p-0">
          <Link to={"/ingreso"} className="text-xs sm:text-sm md:text-base font-sans font-medium text-blue-600">Iniciar sesión</Link>
          <Link to={"/registro"} className="text-xs sm:text-sm md:text-base font-sans font-medium text-blue-600">Registrarse</Link>
          <Button className="btn-default" size="sm" onClick={() => toggleMode()}><i className={`bi ${mode === 'light' ? 'bi-moon-stars' : 'bi-sun'}`}></i></Button>
        </div>
      </div>
    </nav>
  )
}