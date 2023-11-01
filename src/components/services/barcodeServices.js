export const getGoogleBookData = (barcode) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${barcode}&key=APIKey`)
    .then(async (res) => {
    //  res.json())
      if (!res.ok) {
        throw new Error(`Failed to fetch data from Google Books API. Status: ${res.status}`)
      }
      const data = await res.json()
      return data
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
      return null
    })
}
