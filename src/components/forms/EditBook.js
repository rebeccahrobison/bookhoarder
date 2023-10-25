import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBookByBookId, getBookByTitle, updateBook } from "../services/bookServices"
import { BookForm } from "./BookForm"
import { updateUserBook } from "../services/userBookServices"

export const EditBook = () => {
  const [book, setBook] = useState({})
  const [userBook, setUserBook] = useState({})
  
  const bookId = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getBookByBookId(bookId.bookId).then(data => setBook(data[0]))
  }, [bookId])

  useEffect(() => {
    if (book?.userBooks) {
      setUserBook(book?.userBooks[0])
    }
  }, [book])

  const handleEditBookBtn = async(e) => {
    e.preventDefault()

    const bookObj = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      locationId: book.locationId,
      cover: book.cover,
      id: book.id
    }
    
    await updateBook(bookObj)
    const postedBook = await getBookByTitle(book.title)
    userBook.bookId = postedBook[0].id
    updateUserBook(userBook).then(navigate(`/book/${book.id}`))
  }
  
  return (
    <div className="editbook-container">
      <h2>Edit A Book From Your Hoard</h2>
      <BookForm book={book} setBook={setBook} userBook={userBook} setUserBook={setUserBook}/>
      <div className="buttons-container">
        <button>Cancel</button>
        <button onClick={e => {handleEditBookBtn(e)}}>Edit Book</button>
      </div>
    </div>
  )
}