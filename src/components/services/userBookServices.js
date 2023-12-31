export const getAllUserBooks = () => {
  return fetch(`http://localhost:8088/userBooks`)
    .then(res => res.json())
}

export const addUserBook = (book) => {
  return fetch(`http://localhost:8088/userBooks`, {
    method: "POST",  
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book)
  })
}

export const updateUserBook = (userBook) => {
  return fetch(`http://localhost:8088/userBooks/${userBook.id}`, {
    method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userBook)
  })
}

export const deleteUserBook = (userBookId) => {
  return fetch(`http://localhost:8088/userBooks/${userBookId}`, {
    method: "DELETE"
  })
}

export const getUserBooksByUserId = (userId) => {
  const userbookfetch = fetch(`http://localhost:8088/userBooks?userId=${userId}`)
    .then(res => res.json())
  return userbookfetch
}