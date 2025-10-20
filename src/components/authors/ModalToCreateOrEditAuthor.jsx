import { Modal, ModalHeader, ModalBody, Button, Label, TextInput, HelperText, Spinner } from "flowbite-react"
import { useForm, client } from "laravel-precognition-react"
import { useEffect } from "react"
import axios from "@/lib/axios.js"

export function ModalToCreateOrEditAuthor({ isOpen, onClose = null, onAuthorCreated = null, author = null }) {
  const isEditing = author !== null

  client.use(axios)

  const form = useForm(
    isEditing ? "PUT" : "POST",
    isEditing ? `/authors/update/${author?.id}` : "/authors/store",
    {
      name: "",
      birth_date: "",
      top_work: "",
      work_count: ""
    }
  )

  form.setValidationTimeout(1000)

  useEffect(() => {
    if (isOpen) {
      // Si es edición, llenar el formulario con los datos del autor
      if (isEditing && author) {
        form.setData({
          name: author.name || "",
          birth_date: author.birth_date || "",
          top_work: author.top_work || "",
          work_count: author.work_count?.toString() || ""
        })
      }
    }
  }, [isOpen, author])

  function onInputChange(event) {
    form.setData(event.target.id, event.target.value)
    form.validate(event.target.id)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    form.submit().then(response => {
      if (response.status >= 200 && response.status < 300) {
        if (onAuthorCreated) onAuthorCreated(response.data)
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
    form.forgetError("name")
    form.forgetError("birth_date")
    form.forgetError("top_work")
    form.forgetError("work_count")
  }

  return (
    <Modal show={isOpen} onClose={handleClose}>
      <ModalHeader>
        <span className="font-bold text-blue-600 mb-6">
          {isEditing ? "Editar autor" : "Agregar nuevo autor"}
        </span>
      </ModalHeader>
      <ModalBody>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input-container">
            <Label htmlFor="name" className="input-label">Nombre del autor</Label>
            <TextInput
              id="name"
              type="text"
              value={form.data.name}
              onChange={(event) => onInputChange(event)}
            />
            {form.invalid('name') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.name}</HelperText>}
          </div>

          <div className="input-container">
            <Label htmlFor="birth_date" className="input-label">Fecha de nacimiento</Label>
            <TextInput
              id="birth_date"
              type="date"
              value={form.data.birth_date}
              onChange={(event) => onInputChange(event)}
            />
            {form.invalid('birth_date') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.birth_date}</HelperText>}
          </div>

          <div className="input-container">
            <Label htmlFor="top_work" className="input-label">Obra más destacada</Label>
            <TextInput
              id="top_work"
              type="text"
              value={form.data.top_work}
              onChange={(event) => onInputChange(event)}
            />
            {form.invalid('top_work') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.top_work}</HelperText>}
          </div>

          <div className="input-container">
            <Label htmlFor="work_count" className="input-label">Libros publicados</Label>
            <TextInput
              id="work_count"
              type="number"
              min="0"
              value={form.data.work_count}
              onChange={(event) => onInputChange(event)}
            />
            {form.invalid('work_count') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.work_count}</HelperText>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" size="sm" className="btn-secondary" disabled={form.processing} onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" size="sm" className="btn-default" disabled={form.processing}>
              {form.processing ? <span><Spinner size='sm' className='me-2' light/>Guardando</span> : <span>Guardar</span>}
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}
