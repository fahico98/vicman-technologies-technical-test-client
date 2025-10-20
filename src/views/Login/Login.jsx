import { Button, Label, TextInput, HelperText, Spinner } from "flowbite-react"
import { useForm, client } from "laravel-precognition-react"
import { setGlobalState } from "@/state/globalState.js"
import {useNavigate} from "react-router-dom"
import axios from "@/lib/axios.js"
import { useState } from "react"

export function Login() {
  const navigate = useNavigate()
  const [loadingCsrfCookieRequest, setLoadingCsrfCookieRequest] = useState(false)

  client.use(axios)
  
  const form = useForm("POST", "/login", {
    email: "",
    password: ""
  })
  
  form.setValidationTimeout(1000)

  function onInputChange(event) {
    form.setData(event.target.id, event.target.value)
    form.validate(event.target.id)
  }
  
  async function handleSubmit(event) {
    event.preventDefault()

    setLoadingCsrfCookieRequest(true)

    await axios.get(import.meta.env.VITE_API_CSRF_TOKEN_URL).then(response => {
      if (response.status >= 200 && response.status < 300) {
        form.submit().then(response => {
          if (response.status >= 200 && response.status < 300) {
            setGlobalState("user", response.data.user)
            navigate("/libros")
          }
        })
      }
    })

    setLoadingCsrfCookieRequest(false)
  }

  return (
    <div className="w-full h-screen min-h-[40rem] -mt-14 sm:mt-[-5rem] pt-14 sm:pt-20 flex justify-center items-center hero-secondary-gradient">
      <div className="w-full max-w-md">
        <h2 className="text-start text-3xl font-bold text-blue-600 mb-6">Iniciar sesión</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input-container">
            <Label htmlFor="email" className="input-label">Correo electrónico</Label>
            <TextInput
              id="email"
              type="text"
              placeholder="nombre@ejemplo.com"
              value={form.data.email}
              onChange={(event)=> onInputChange(event)}
            />
            {form.invalid('email') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.email}</HelperText>}
          </div>
          <div className="input-container">
            <Label htmlFor="password" className="input-label">Contraseña</Label>
            <TextInput
              id="password"
              type="password"
              value={form.data.password}
              onChange={(event) => onInputChange(event)}
            />
            {form.invalid('password') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.password}</HelperText>}
          </div>
          <div className="flex justify-start">
            <Button type="submit" size="sm" className="btn-default">
              {
                form.processing || loadingCsrfCookieRequest
                  ? <span><Spinner size="sm" aria-label="Info spinner example" className="me-2" light/>Enviando</span>
                  : <span>Enviar</span>
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}