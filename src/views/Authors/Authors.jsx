import { ModalToCreateOrEditAuthor } from "@/components/authors/ModalToCreateOrEditAuthor.jsx"
import { ModalToDeleteAuthor } from "@/components/authors/ModalToDeleteAuthor.jsx"
import { handleFetchingInScroll } from "@/utils/globalFunctions.js"
import bookDefaultCover from "@/assets/book_default_cover.png"
import { Card, Spinner, Button } from "flowbite-react"
import { useEffect, useState } from "react"
import axios from "@/lib/axios.js"

export function Authors() {
  const [authors, setAuthors] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [noMoreAuthors, setNoMoreAuthors] = useState(false)
  const [selectedAuthorToEdit, setSelectedAuthorToEdit] = useState(null)
  const [selectedAuthorToDelete, setSelectedAuthorToDelete] = useState(null)
  const [openModalToDeleteAuthor, setOpenModalToDeleteAuthor] = useState(false)
  const [openModalToCreateOrEditAuthor, setOpenModalToCreateOrEditAuthor] = useState(false)

  const FETCHING_OFFSET_IN_PX = 100

  useEffect(() => {
    fetchAuthors()
  }, [])

  useEffect(() => {
    async function fetchMoreAuthors() {
      if (loading || !nextPageUrl || noMoreAuthors) return

      setLoading(true)

      await axios.get(nextPageUrl, { params: { with_pagination: true } })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.data

            if (data.data.length > 0) {
              setAuthors([...authors, ...data.data])
              setNextPageUrl(data.next_page_url)
            } else {
              setNoMoreAuthors(true)
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
      await handleFetchingInScroll(fetchMoreAuthors, FETCHING_OFFSET_IN_PX)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [authors, loading, nextPageUrl, noMoreAuthors])

  async function fetchAuthors() {
    if (loading || noMoreAuthors) return
    
    setLoading(true)

    await axios.get("/authors", { params: { with_pagination: true } })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data.data
          setAuthors(data.data)
          setNextPageUrl(data.next_page_url)
        }
      })
      .catch(error => {
        console.log(error)
      })

    setLoading(false)
  }

  async function onAuthorCreated() {
    setSelectedAuthorToEdit(null)
    setAuthors([])
    setNextPageUrl(null)
    await fetchAuthors()
  }

  async function onAuthorDeleted() {
    setSelectedAuthorToDelete(null)
    setAuthors([])
    setNextPageUrl(null)
    await fetchAuthors()
  }

  function selectAuthorToEdit(index) {
    setSelectedAuthorToEdit(authors[index])
    setOpenModalToCreateOrEditAuthor(true)
  }

  function openModalToCreateAuthor() {
    setSelectedAuthorToEdit(null)
    setOpenModalToCreateOrEditAuthor(true)
  }

  function selectAuthorToDelete(index) {
    setSelectedAuthorToDelete(authors[index])
    setOpenModalToDeleteAuthor(true)
  }

  return (
    <div className="view-wrapper padding-x mb-10">
      <ModalToCreateOrEditAuthor
        isOpen={openModalToCreateOrEditAuthor}
        onClose={() => setOpenModalToCreateOrEditAuthor(false)}
        onAuthorCreated={() => onAuthorCreated()}
        author={selectedAuthorToEdit}
      />

      <ModalToDeleteAuthor
        isOpen={openModalToDeleteAuthor}
        onClose={() => setOpenModalToDeleteAuthor(false)}
        onAuthorDeleted={() => onAuthorDeleted()}
        author={selectedAuthorToDelete}
      />

      <div className="w-full flex justify-between items-center py-10">
        <h1 className="text-3xl font-bold text-blue-600">Autores Registrados</h1>
        <Button className="btn-default" size="md" onClick={() => openModalToCreateAuthor()}>
          <i className="bi bi-plus-circle mr-2"></i>Agregar autor
        </Button>
      </div>

      {authors.length > 0 &&
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {authors.map((author, index) => (
            <Card
              key={author.id}
              className="bg-gray-100 dark:bg-gray-800"
              imgSrc={author.open_library_key === null ? bookDefaultCover : `${import.meta.env.VITE_OPEN_LIBRARY_COVERS_BASE_URL}/a/olid/${author.open_library_key}-L.jpg`}
              horizontal
              theme={{
                root: { children: "w-full" }
              }}
            >
              <div className="h-full w-full flex flex-col justify-between">
                <div className="flex w-full flex-col gap-y-2">
                  <h5 className="text-xl font-bold tracking-tight text-blue-600 dark:text-white">
                    {author.name}
                  </h5>
                  <div className="flex flex-col gap-y-0">
                    {author.birth_date && (
                      <p className="text-sm text-gray-800 dark:text-white">
                        <span className="font-semibold">Fecha de nacimiento:</span> {author.birth_date}
                      </p>
                    )}
                    {author.top_work && (
                      <p className="text-sm text-gray-800 dark:text-white">
                        <span className="font-semibold">Obra mas destacada:</span> {author.top_work}
                      </p>
                    )}
                    {author.work_count !== undefined && (
                      <p className="text-sm text-gray-800 dark:text-white">
                        <span className="font-semibold">Libros publicados:</span> {author.work_count}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-end gap-x-2 mt-4">
                  <Button className="btn-default" size="sm" onClick={() => selectAuthorToEdit(index)}>
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button className="btn-error" size="sm" onClick={() => selectAuthorToDelete(index)}>
                    <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      }

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Spinner size="xl" aria-label="Cargando más autores" />
        </div>
      )}
    </div>
  )
}