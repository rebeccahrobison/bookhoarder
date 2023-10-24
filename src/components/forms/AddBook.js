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

// I have a question about how id's work when posting to a database. I want to post an object1 to table1 in the database, and next post object2 with object1.id as a foreign key property to table2 in the database. Would it be best to get table1.length +1 to use as object2.object1Id, or better to fetch the updated table1 and filter it for the largest id number? I'm not sure how a database works if, for example, an object was deleted, does the next posted object have an id of the deleted object?