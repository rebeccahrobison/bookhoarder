export const getAllBooks = () => {
  return fetch("http://localhost:8088/books?_expand=location")
    .then(res => res.json()
  )
}

export const getBookByBookId = (bookId) => {
  return fetch(`http://localhost:8088/books?id=${bookId}&_expand=location&_embed=userBooks`)
    .then(res => res.json())
}