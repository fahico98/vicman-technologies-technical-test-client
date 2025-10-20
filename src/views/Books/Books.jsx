import { ModalToCreateOrEditBook } from "@/components/books/ModalToCreateOrEditBook.jsx"
import { ModalToDeleteBook } from "@/components/books/ModalToDeleteBook.jsx"
import { handleFetchingInScroll } from "@/utils/globalFunctions.js"
import bookDefaultCover from "@/assets/book_default_cover.png"
import { Card, Spinner, Button } from "flowbite-react"
import { useEffect, useState } from "react"
import axios from "@/lib/axios.js"

export function Books() {
  const [books, setBooks] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [noMoreBooks, setNoMoreBooks] = useState(false)
  const [selectedBookToEdit, setSelectedBookToEdit] = useState(null)
  const [selectedBookToDelete, setSelectedBookToDelete] = useState(null)
  const [openModalToDeleteBook, setOpenModalToDeleteBook] = useState(false)
  const [openModalToCreateOrEditBook, setOpenModalToCreateOrEditBook] = useState(false)

  const FETCHING_OFFSET_IN_PX = 100

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    async function fetchMoreBooks() {
      if (loading || !nextPageUrl || noMoreBooks) return
      
      setLoading(true)

      await axios.get(nextPageUrl, { params: { with_pagination: true } })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data
            
            if (data.data.length > 0) {
              setBooks([...books, ...data.data])
              setNextPageUrl(data.next_page_url)
            } else {
              setNoMoreBooks(true)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })

      setLoading(false)
    }
    
    async function onScroll(event) {
      event.stopPropagation()
      await handleFetchingInScroll(fetchMoreBooks, FETCHING_OFFSET_IN_PX)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [books, loading, nextPageUrl, noMoreBooks])
  
  async function fetchBooks() {
    if (loading || noMoreBooks) return
    
    setLoading(true)
    
    await axios.get("/books", { params: { with_pagination: true } })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data.data
          setBooks(data.data)
          setNextPageUrl(data.next_page_url)
        }
      })
      .catch(error => {
        console.log(error)
      })
    
    setLoading(false)
  }
  
  async function onBookCreated() {
    setSelectedBookToEdit(null)
    setBooks([])
    setNextPageUrl(null)
    await fetchBooks()
  }
  
  async function onBookDeleted() {
    setSelectedBookToDelete(null)
    setBooks([])
    setNextPageUrl(null)
    await fetchBooks()
  }
  
  function selectBookToEdit(index) {
    setSelectedBookToEdit(books[index])
    setOpenModalToCreateOrEditBook(true)
  }
  
  function openModalToCreateBook() {
    setSelectedBookToEdit(null)
    setOpenModalToCreateOrEditBook(true)
  }
  
  function selectBookToDelete(index) {
    setSelectedBookToDelete(books[index])
    setOpenModalToDeleteBook(true)
  }
  
  return (
    <div className="view-wrapper padding-x mb-10">
      <ModalToCreateOrEditBook
        isOpen={openModalToCreateOrEditBook}
        onClose={() => setOpenModalToCreateOrEditBook(false)}
        onBookCreated={() => onBookCreated()}
        book={selectedBookToEdit}
      />
      
      <ModalToDeleteBook
        isOpen={openModalToDeleteBook}
        onClose={() => setOpenModalToDeleteBook(false)}
        onBookDeleted={() => onBookDeleted()}
        book={selectedBookToDelete}
      />
      
      <div className="w-full flex justify-between items-center py-10">
        <h1 className="text-3xl font-bold text-blue-600">Biblioteca de Libros</h1>
        <Button className="btn-default" size="md" onClick={() => openModalToCreateBook()}>
          <i className="bi bi-plus-circle mr-2"></i>Agregar libro
        </Button>
      </div>

      {books.length > 0 &&
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <Card
              key={book.id}
              imgSrc={book.open_library_cover_key === null ? bookDefaultCover : `${import.meta.env.VITE_OPEN_LIBRARY_COVERS_BASE_URL}/b/olid/${book.open_library_cover_key}-L.jpg`}
              className="bg-gray-100 dark:bg-gray-800"
              horizontal
              theme={{
                root: { children: "w-full" }
              }}
            >
              <div className="h-full w-full flex flex-col justify-between">
                <div className="flex w-full flex-col gap-y-2">
                  <h5 className="text-xl font-bold tracking-tight text-blue-600 dark:text-white">{book.title}</h5>
                  <div className="flex flex-col gap-y-0">
                    <p className="text-sm text-gray-800 dark:text-white">
                      <span className="font-semibold">Autor:</span> {book.author?.name || "Autor desconocido"}
                    </p>
                    {book.units_available && (
                      <p className="text-sm text-gray-800 dark:text-white">
                        <span className="font-semibold">Unidades disponibles:</span> {book.units_available}
                      </p>
                    )}
                    {book.first_publish_year && (
                      <p className="text-sm text-gray-800 dark:text-white">
                        <span className="font-semibold">Año de publicación:</span> {book.first_publish_year}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-end gap-x-2">
                  <Button className="btn-default" size="sm" onClick={() => selectBookToEdit(index)}><i className="bi bi-pencil-square"></i></Button>
                  <Button className="btn-error" size="sm" onClick={() => selectBookToDelete(index)}><i className="bi bi-trash3"></i></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      }

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Spinner size="xl" aria-label="Cargando más libros" />
        </div>
      )}
    </div>
  )
}