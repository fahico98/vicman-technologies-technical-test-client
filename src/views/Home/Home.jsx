import { Button } from "flowbite-react"
import { Link } from "react-router-dom"
import { useGlobalState } from "@/state/globalState.js"

export function Home() {
  const [user] = useGlobalState("user")

  return (
    <div className="view-wrapper padding-x h-[calc(100vh-5rem)]">
      {/* Hero Section */}
      <section className="relative h-full w-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>
                <i className="bi bi-book-half text-8xl sm:text-9xl md:text-[12rem] text-blue-600 dark:text-blue-400 relative"></i>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 dark:text-white mb-10 leading-tight">
              Tu Biblioteca
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 leading-normal">
                Digital
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 my-10 max-w-3xl mx-auto leading-relaxed">
              Descubre, organiza y gestiona tu colección de libros. Un mundo de conocimiento al alcance de tus manos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <>
                  <Link to="/libros">
                    <Button className="btn-default" size="xl">
                      <i className="bi bi-book mr-2"></i>
                      Explorar Libros
                    </Button>
                  </Link>
                  <Link to="/autores">
                    <Button className="btn-secondary" size="xl">
                      <i className="bi bi-person mr-2"></i>
                      Ver Autores
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/registro">
                    <Button className="btn-default" size="xl">
                      <i className="bi bi-pen mr-2"></i>
                      Comenzar Ahora
                    </Button>
                  </Link>
                  <Link to="/ingreso">
                    <Button className="btn-secondary" size="xl">
                      <i className="bi bi-box-arrow-in-right mr-2"></i>
                      Iniciar Sesión
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}