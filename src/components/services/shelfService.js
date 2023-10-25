export const getAllShelves = () => {
  return fetch(`http://localhost:8088/locations`)
    .then(res => res.json())
}

export const addShelf = (shelf) => {
  return fetch(`http://localhost:8088/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shelf)
  })
}

