import { Modal, ModalHeader, ModalBody, Button, Spinner } from "flowbite-react"
import axios from "@/lib/axios.js"
import { useState } from "react"

export function ModalToDeleteAuthor({ isOpen, onClose = null, onAuthorDeleted = null, author = null }) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!author) return

    setIsDeleting(true)

    await axios.delete(`/authors/delete/${author.id}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          if (onAuthorDeleted) onAuthorDeleted(author)
          handleClose()
        }
      })
      .catch(error => {
        console.log(error)
      })

    setIsDeleting(false)
  }

  function handleClose() {
    if (onClose !== null) onClose()
  }

  return (
    <Modal show={isOpen} onClose={handleClose} size="md">
      <ModalHeader>
        <span className="font-bold text-blue-600 mb-6">Eliminar autor</span>
      </ModalHeader>
      <ModalBody>
        <div>
          <p className="text-base text-gray-800 dark:text-white leading-relaxed mb-4">
            ¿Estás seguro de que deseas eliminar este autor?
          </p>

          {author && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-800 dark:text-white">
                <span className="font-semibold">Nombre:</span> {author.name}
              </p>
              {author.birth_date && (
                <p className="text-sm text-gray-800 dark:text-white">
                  <span className="font-semibold">Fecha de nacimiento:</span> {author.birth_date}
                </p>
              )}
              {author.top_work && (
                <p className="text-sm text-gray-800 dark:text-white">
                  <span className="font-semibold">Obra destacada:</span> {author.top_work}
                </p>
              )}
              {author.work_count !== undefined && (
                <p className="text-sm text-gray-800 dark:text-white">
                  <span className="font-semibold">Libros publicados:</span> {author.work_count}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" size="sm" className="btn-secondary" disabled={isDeleting} onClick={handleClose}>Cancelar</Button>
            <Button type="button" size="sm" className="btn-error" disabled={isDeleting} onClick={handleDelete}>
              {isDeleting ? <span><Spinner size="sm" className="me-2" light />Eliminando</span> : <span>Eliminar</span>}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
