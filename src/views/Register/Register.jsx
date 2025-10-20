import { Button, Label, TextInput, HelperText, Spinner } from "flowbite-react"
import { useForm, client } from "laravel-precognition-react"
import axios from "@/lib/axios.js"

export function Register() {
  client.use(axios)

  const form = useForm("post", "/register", {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })

  form.setValidationTimeout(1000)

  function onInputChange(event) {
    form.setData(event.target.id, event.target.value)
    form.validate(event.target.id)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    form.submit()
  }

  return (
    <div className="w-full h-screen min-h-[40rem] -mt-14 sm:mt-[-5rem] pt-14 sm:pt-20 flex justify-center items-center hero-secondary-gradient">
      <div className="w-full max-w-md">
        <h2 className="text-start text-3xl font-bold text-blue-600 mb-6">Registrarse</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input-container">
            <Label htmlFor="name" className="input-label">Nombre</Label>
            <TextInput
              id="name"
              type="text"
              value={form.data.name}
              onChange={(event) => onInputChange(event)}
            />
            {form.invalid('name') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.name}</HelperText>}
          </div>
          <div className="input-container">
            <Label htmlFor="email" className="input-label">Correo electrónico</Label>
            <TextInput
              id="email"
              type="text"
              placeholder="nombre@ejemplo.com"
              value={form.data.email}
              onChange={(event) => onInputChange(event)}
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
          <div className="input-container">
            <Label htmlFor="password_confirmation" className="input-label">Confirmación de contraseña</Label>
            <TextInput
              id="password_confirmation"
              type="password"
              value={form.data.password_confirmation}
              onChange={(event) => onInputChange(event)}
            />
            {form.invalid('password_confirmation') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.password_confirmation}</HelperText>}
          </div>
          <div className="flex justify-start">
            <Button type="submit" size="sm" className="btn-default">
              {form.processing ? <span><Spinner size="sm" aria-label="Info spinner example" className="me-2" light/>Enviando</span> : <span>Enviar</span>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}