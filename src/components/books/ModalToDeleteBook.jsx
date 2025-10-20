import { Modal, ModalHeader, ModalBody, Button, Spinner } from "flowbite-react"
import axios from "@/lib/axios.js"
import { useState } from "react"

export function ModalToDeleteBook({ isOpen, onClose = null, onBookDeleted = null, book = null }) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!book) return

    setIsDeleting(true)

    await axios.delete(`/books/delete/${book.id}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          if (onBookDeleted) onBookDeleted(book)
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
        <span className="font-bold text-blue-600 mb-6">Eliminar libro</span>
      </ModalHeader>
      <ModalBody>
        <div>
          <p className="text-base text-gray-800 dark:text-white leading-relaxed mb-4">
            ¿Estás seguro de que deseas eliminar este libro?
          </p>

          {book && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-800 dark:text-white">
                <span className="font-semibold">Título:</span> {book.title}
              </p>
              <p className="text-sm text-gray-800 dark:text-white">
                <span className="font-semibold">Autor:</span> {book.author?.name || "Autor desconocido"}
              </p>
              {book.first_publish_year && (
                <p className="text-sm text-gray-800 dark:text-white">
                  <span className="font-semibold">Año de publicación:</span> {book.first_publish_year}
                </p>
              )}
              {book.units_available && (
                <p className="text-sm text-gray-800 dark:text-white">
                  <span className="font-semibold">Ejemplares disponibles:</span> {book.units_available}
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