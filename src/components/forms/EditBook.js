import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBookByBookId } from "../services/bookServices"
import { BookForm } from "./BookForm"

export const EditBook = () => {
  const [book, setBook] = useState({})
  const [userBook, setUserBook] = useState({})
  
  const bookId = useParams()

  useEffect(() => {
    getBookByBookId(bookId.bookId).then(data => setBook(data[0]))
  }, [bookId])

  useEffect(() => {
    if (book?.userBooks) {
      setUserBook(book?.userBooks[0])
    }
  }, [book])
  
  return (
    <div className="editbook-container">
      <h2>Edit A Book From Your Hoard</h2>
      <BookForm book={book} setBook={setBook} userBook={userBook} setUserBook={setUserBook}/>
      <div className="buttons-container">
        <button>Cancel</button>
        {/* <button onClick={e => {handleAddBook(e)}}>Add Book</button> */}
      </div>
    </div>
  )
}