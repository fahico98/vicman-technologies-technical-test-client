import { Modal, ModalHeader, ModalBody, Button, Label, TextInput, Select, HelperText, Spinner } from "flowbite-react"
import { useForm, client } from "laravel-precognition-react"
import { useEffect, useState } from "react"
import axios from "@/lib/axios.js"

export function ModalToCreateOrEditBook({ isOpen, onClose = null, onBookCreated = null, book = null }) {
  const [authors, setAuthors] = useState([])
  const [loadingAuthors, setLoadingAuthors] = useState(true)

  const isEditing = book !== null

  client.use(axios)

  const form = useForm(
    isEditing ? "PUT" : "POST",
    isEditing ? `/books/update/${book?.id}` : "/books/store",
    {
      author_id: "",
      title: "",
      first_publish_year: "",
      units_available: ""
    }
  )

  form.setValidationTimeout(1000)

  useEffect(() => {
    if (isOpen) {
      fetchAuthors()
      
      // Si es edición, llenar el formulario con los datos del libro
      if (isEditing && book) {
        form.setData({
          author_id: book.author_id?.toString() || "",
          title: book.title || "",
          first_publish_year: book.first_publish_year?.toString() || "",
          units_available: book.units_available?.toString() || ""
        })
      }
    }
  }, [isOpen, book])

  async function fetchAuthors() {
    setLoadingAuthors(true)

    await axios.get("/authors")
      .then(response => {
        if (response.status >= 200 && response.status < 300) setAuthors(response.data.data || response.data)
      })
      .catch(error => {
        console.log(error)
      })

    setLoadingAuthors(false)
  }

  function onInputChange(event) {
    form.setData(event.target.id, event.target.value)
    form.validate(event.target.id)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    form.submit().then(response => {
      if (response.status >= 200 && response.status < 300) {
        if (onBookCreated) onBookCreated(response.data)
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
    form.forgetError("author_id")
    form.forgetError("title")
    form.forgetError("first_publish_year")
    form.forgetError("units_available")
  }

  return (
    <Modal show={isOpen} onClose={handleClose}>
      <ModalHeader>
        <span className="font-bold text-blue-600 mb-6">
          {isEditing ? "Editar libro" : "Agregar nuevo libro"}
        </span>
      </ModalHeader>
      <ModalBody>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input-container">
            <Label htmlFor="author_id" className="input-label">Autor</Label>
            {loadingAuthors
              ? <div className="flex justify-start py-2"><Spinner size="md" /></div>
              : (
                <Select id="author_id" value={form.data.author_id} onChange={(event) => onInputChange(event)}>
                  <option value="">Selecciona un autor</option>
                  {authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
                </Select>
              )
            }
            {form.invalid('author_id') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.author_id}</HelperText>}
          </div>

          <div className="input-container">
            <Label htmlFor="title" className="input-label">Título del libro</Label>
            <TextInput id="title" type="text" value={form.data.title} onChange={(event) => onInputChange(event)}/>
            {form.invalid('title') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.title}</HelperText>}
          </div>
          
          <div className="input-container">
            <Label htmlFor="first_publish_year" className="input-label">Año de publicación</Label>
            <TextInput id="first_publish_year" type="number" value={form.data.first_publish_year} onChange={(event) => onInputChange(event)}/>
            {form.invalid('first_publish_year') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.first_publish_year}</HelperText>}
          </div>

          <div className="input-container">
            <Label htmlFor="units_available" className="input-label">Ejemplares disponibles</Label>
            <TextInput id="units_available" type="number" value={form.data.units_available} onChange={(event) => onInputChange(event)}/>
            {form.invalid('units_available') && <HelperText className="input-error-text"><i className="bi bi-exclamation-circle"></i>&nbsp;{form.errors.units_available}</HelperText>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" size="sm" className="btn-secondary" disabled={form.processing} onClick={handleClose}>Cancelar</Button>
            <Button type="submit" size="sm" className="btn-default" disabled={form.processing}>
              {form.processing ? <span><Spinner size='sm' className='me-2' light/>Guardando</span> : <span>Guardar</span>}
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}