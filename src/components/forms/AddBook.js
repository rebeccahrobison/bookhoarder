import { useEffect, useState } from "react"
import { BookForm } from "./BookForm"
import { addBook, getAllBooks, getBookByTitle } from "../services/bookServices"
import { useNavigate } from "react-router-dom"
import { addUserBook } from "../services/userBookServices"

export const AddBook = () => {
  const [book, setBook] = useState(
    {title: "", author: "", cover: "", genre: "", locationId: 0}
  )
  const [userBook, setUserBook] = useState(
    {bookId: 0, userId: 0}
  )

  const navigate = useNavigate()

  const handleAddBook = async (e) => {
    e.preventDefault()
    
    await addBook(book)
    const postedBook = await getBookByTitle(book.title)
    userBook.bookId = postedBook[0].id
    addUserBook(userBook).then(navigate(`/`))
  }

  return (
    <div className="addbook-container">
      <h2>Add A New Book To Your Hoard</h2>
      <BookForm book={book} setBook={setBook} userBook={userBook} setUserBook={setUserBook}/>
      <div className="buttons-container">
        <button>Cancel</button>
        <button onClick={e => {handleAddBook(e)}}>Add Book</button>
      </div>
    </div>
  )
}

// Form items
// Title: textbox
// Author: textbox
// Genre: textbox
// Cover Image: textbox
// Owned By: dropdown
// Shelf: dropdown
// Read Status: dropdown
// Add Shelf button
// Cancel button navigates to BookList
// Save Book navigates to BookList
// TODO: Barcode scanner button
