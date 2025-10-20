import { Modal, ModalHeader, ModalBody, Button, Label, TextInput, Select, HelperText, Spinner } from "flowbite-react"
import { useForm, client } from "laravel-precognition-react"
import { useEffect, useState } from "react"
import axios from "@/lib/axios.js"

export function LoanModal({ isOpen, onClose = null, onLoanCreated = null, book = null }) {
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)

  client.use(axios)

  const form = useForm("POST", "/loans/store", {
    user_id: "",
    book_id: book?.id || "",
    date: "",
    return_date: ""
  })

  form.setValidationTimeout(1000)

  useEffect(() => {
    if (isOpen) {
      fetchUsers()

      // Establecer el book_id cuando cambie el libro
      if (book) form.setData("book_id", book.id)

      // Establecer la fecha de préstamo como hoy por defecto
      const today = new Date().toISOString().split('T')[0]
      form.setData("date", today)
    }
  }, [isOpen, book])

  const fetchUsers = async () => {
    setLoadingUsers(true)

    await axios.get("/users")
      .then(response => {
        if (response.status >= 200 && response.status < 300) setUsers(response.data.data || response.data)
      })
      .catch(error => {
        console.log(error)
      })

    setLoadingUsers(false)
  }

  function onInputChange(event) {
    form.setData(event.target.id, event.target.value)
    form.validate(event.target.id)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    form.submit().then(response => {
      if (response.status >= 200 && response.status < 300) {
        if (onLoanCreated) onLoanCreated(response.data)
        handleClose()
      }
    }).catch(error => {
      console.log(error)
    })
  }

  function handleClose() {
    resetForm()
    if (onClose !== null) onClose()
  }

  function resetForm() {
    form.reset()
    form.forgetError("user_id")
    form.forgetError("book_id")
    form.forgetError("date")
    form.forgetError("return_date")
  }

  return (
    <Modal show={isOpen} onClose={handleClose}>
      <ModalHeader>
        <span className="font-bold text-blue-600 mb-6">Prestar libro</span>
      </ModalHeader>
      <ModalBody>
        {book && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2 mb-6">
            <p className="text-sm text-gray-800 dark:text-white">
              <span className="font-semibold">Libro:</span> {book.title}
            </p>
            <p className="text-sm text-gray-800 dark:text-white">
              <span className="font-semibold">Autor:</span> {book.author?.name || "Autor desconocido"}
            </p>
            {book.units_available && (
              <p className="text-sm text-gray-800 dark:text-white">
                <span className="font-semibold">Unidades disponibles:</span> {book.units_available}
              </p>
            )}
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input-container">
            <Label htmlFor="user_id" className="input-label">Usuario</Label>
            {loadingUsers ? (
              <div className="flex justify-start py-2">
                <Spinner size="md" />
              </div>
            ) : (
              <Select id="user_id" value={form.data.user_id} onChange={(event) => onInputChange(event)}>
                <option value="">Selecciona un usuario</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                ))}
              </Select>
            )}
            {form.invalid('user_id') && (
              <HelperText className="input-error-text">
                <i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.user_id}
              </HelperText>
            )}
          </div>

          <div className="input-container">
            <Label htmlFor="date" className="input-label">Fecha de préstamo</Label>
            <TextInput id="date" type="date" value={form.data.date} onChange={(event) => onInputChange(event)}/>
            {form.invalid('date') && (
              <HelperText className="input-error-text">
                <i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.date}
              </HelperText>
            )}
          </div>

          <div className="input-container">
            <Label htmlFor="return_date" className="input-label">Fecha de devolución</Label>
            <TextInput id="return_date" type="date" value={form.data.return_date} onChange={(event) => onInputChange(event)}/>
            {form.invalid('return_date') && (
              <HelperText className="input-error-text">
                <i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.return_date}
              </HelperText>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" size="sm" className="btn-secondary" disabled={form.processing} onClick={handleClose}>Cancelar</Button>
            <Button type="submit" size="sm" className="btn-default" disabled={form.processing}>
              {form.processing ? <span><Spinner size="sm" className="me-2" light />Guardando</span> : <span>Registrar prestamo</span>}
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}