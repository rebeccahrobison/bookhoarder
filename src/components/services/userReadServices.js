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