import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addUserReadBook, deleteBook, deleteUserReadBook, getBookByBookId, getBorrowedBooks, getUserReadBooksByUserId } from "../services/bookServices"
import "./BookDetails.css"
import { getUserByUserId } from "../services/userServices"

export const BookDetails = () => {
  const [book, setBook] = useState({})
  const [bookOwner, setBookOwner] = useState({})
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [userReadBooks, setUserReadBooks] = useState([])
  const [userReadBook, setUserReadBook] = useState([])
  // const [isChecked, setIsChecked] = useState(isRead())

  const { bookId } = useParams()
  const navigate = useNavigate()
  const currentUser =  JSON.parse(localStorage.getItem("bookhoarder_user"))

  const getAllUserReadBooks = () => {
    getUserReadBooksByUserId(currentUser.id).then(data => setUserReadBooks(data))
  }

  useEffect(() => {
    getBookByBookId(bookId).then(data => setBook(data[0]))
  }, [bookId])

  useEffect(() => {
    if (book?.userBooks) {
      getUserByUserId(book?.userBooks[0]?.userId).then(data => setBookOwner(data[0]))
    }
  }, [book])

  useEffect(() => {
    getBorrowedBooks().then(data => setBorrowedBooks(data))
  }, [])

  useEffect(() => {
    getAllUserReadBooks()
  }, [])

  useEffect(() => {
    const readBook = userReadBooks.filter(rBook => {
      return rBook.bookId === book.id
    })
    setUserReadBook(readBook)
  }, [book, userReadBooks])

  const isBorrowed = () => {
    const borrowedBook = borrowedBooks.some(bBook => {
      return bBook.bookId === book.id
    })
    return borrowedBook
  }

  const isRead = () => {
    return userReadBook.length > 0
  }

  const handleCheck = async (e) => {
    // if user has read book, unchecking box deletes from userReadBooks
    // if user has not read book, checking box adds to userReadBooks
    if (isRead() && userReadBook) {
      await deleteUserReadBook(userReadBook[0].id)
      getAllUserReadBooks()

    } else {
      const userReadBookObj = {userId: currentUser.id, bookId: book.id}
      await addUserReadBook(userReadBookObj)
      getAllUserReadBooks()
    }
  }

  const handleDelete = () => {
    deleteBook(bookId).then(navigate(`/`))
  }

  const handleEdit = () => {
    navigate(`/editbook/${bookId}`)
  }

  return (
    <div className="book-details-container">
      <div className="book-details">
        <div className="book-cover">
          <img src={book.cover} alt="Current book cover"/>
        </div>
        <div className="book-info-container">
          <div className="book-info"><span>Title: </span>"{book.title}"</div>
          <div className="book-info"><span>Author: </span>{book.author}</div>
          <div className="book-info"><span>Genre: </span>{book.genre}</div>
          <div className="book-info"><span>Owned By: </span>{bookOwner?.name}</div>
          {isBorrowed() ? 
            (<div className="book-info"><span>Borrowed By: </span>{book.title}</div>) 
          : (<div className="book-info"><span>Location: </span>{book?.location?.shelf}</div>)
          }
          <div className="book-info read-status">
            <div className="book-info">
              <span>Read Status: </span>
              {isRead() ? ("Read") : ("Unread")}
            </div>
            <input type="checkbox" checked={isRead()} onChange={handleCheck} />
          </div>
        </div>
      </div>
      
      <button onClick={handleEdit}>Edit Book</button>
      <button onClick={handleDelete}>Delete Book</button>
      {isBorrowed() ? (<button>Return Book</button>) : (<button>Loan Book</button>)}
      

    </div>
  )
}