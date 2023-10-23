export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`)
    .then(res => res.json())
}

export const getUserByUserId = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}`)
    .then(res => res.json())
}