export const getAllBooks = () => {
  return fetch("http://localhost:8088/books?_expand=location")
    .then(res => res.json()
  )
}

export const getBookByBookId = (bookId) => {
  return fetch(`http://localhost:8088/books?id=${bookId}&_expand=location&_embed=userBooks`)
    .then(res => res.json())
}

export const getBorrowedBooks = () => {
  return fetch(`http://localhost:8088/borrowedBooks?_expand=book`)
    .then(res => res.json())
}

export const getUserReadBooksByUserId = (userId) => {
  return fetch(`http://localhost:8088/userReadBooks?userId=${userId}`)
    .then(res => res.json())
}

export const deleteUserReadBook = (userReadBookId) => {
  return fetch(`http://localhost:8088/userReadBooks/${userReadBookId}`, {
    method: "DELETE"
  })
}

export const addUserReadBook = (readBook) => {
  return fetch(`http://localhost:8088/userReadBooks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(readBook)
  })
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