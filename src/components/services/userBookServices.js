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