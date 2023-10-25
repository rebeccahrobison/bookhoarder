export const addBorrowedBook = (borrowedBook) => {
  return fetch(`http://localhost:8088/borrowedBooks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrowedBook)
  })
}

export const deleteBorrowedBook = (borrowedBookId) => {
  return fetch(`http://localhost:8088/borrowedBooks/${borrowedBookId}`, {
    method: "DELETE"
  })
}

export const getBorrowedBooks = () => {
  return fetch(`http://localhost:8088/borrowedBooks?_expand=book`)
    .then(res => res.json())
}
