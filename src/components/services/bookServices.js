export const getAllBooks = () => {
  return fetch("http://localhost:8088/books?_expand=location")
    .then(res => res.json()
  )
}

export const getBookByBookId = (bookId) => {
  return fetch(`http://localhost:8088/books?id=${bookId}&_expand=location&_embed=userBooks`)
    .then(res => res.json())
}

export const addBook = (book) => {
  return fetch(`http://localhost:8088/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book)
  })
}

export const getBookByTitle = (title) => {
  return fetch(`http://localhost:8088/books?title=${title}`)
    .then(res => res.json())
}

export const deleteBook = (bookId) => {
  return fetch(`http://localhost:8088/books/${bookId}`, {
    method: "DELETE"
  })
}

export const updateBook = (book) => {
  return fetch(`http://localhost:8088/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book)
  })
}