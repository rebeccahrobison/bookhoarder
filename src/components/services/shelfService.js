export const getAllShelves = () => {
  return fetch(`http://localhost:8088/locations`)
    .then(res => res.json())
}