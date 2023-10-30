export const getGoogleBookData = (barcode) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${barcode}&key=AIzaSyAcrYlZxtqJUGkBwuJxgCP2nauXVuUwn5g`)
    .then(res => res.json())
}