import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteBook, getBookByBookId } from "../services/bookServices"
import "./BookDetails.css"
import { getUserByUserId } from "../services/userServices"
import { LoanBookModal } from "../modals/LoanBookModal"
import { ReturnBookModal } from "../modals/ReturnBookModal"
import { deleteBorrowedBook, getBorrowedBooks } from "../services/borrowedServices"
import { addUserReadBook, deleteUserReadBook, getUserReadBooksByUserId } from "../services/userReadServices"
import { Button } from "react-bootstrap"

export const BookDetails = () => {
  const [book, setBook] = useState({})
  const [bookOwner, setBookOwner] = useState({})
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [userReadBooks, setUserReadBooks] = useState([])
  const [userReadBook, setUserReadBook] = useState([])
  const [borrowedBook, setBorrowedBook] = useState({})


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

  const getAllBorrowedBooks = () => {
    getBorrowedBooks().then(data => setBorrowedBooks(data))
  }

  useEffect(() => {
    getAllBorrowedBooks()
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

  useEffect(() => {
    const foundBorrowedBook = borrowedBooks.filter(book => book.bookId === parseInt(bookId))
    setBorrowedBook(foundBorrowedBook[0])
  }, [borrowedBooks, bookId])


  const isBorrowed = () => {
    const borrowedBook = borrowedBooks.some(bBook => {
      return bBook.bookId === book?.id
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

  const handleDelete = async () => {
    if (isBorrowed()) {
      await deleteBorrowedBook(borrowedBook.id)
    }
    if (isRead()) {
      await deleteUserReadBook(userReadBook?.id)
    }
    await deleteBook(bookId)
    // await deleteUserBook(book?.userBooks?.id)
    navigate(`/`)
  }

  const handleEdit = () => {
    navigate(`/editbook/${bookId}`)
  }


  return (
    <div className="book-details-container">
      <div className="book-details">
        <div className="book-details-cover">
          <img src={book?.cover} alt="Current book cover"/>
        </div>
        <div className="book-info-cont">
          <div className="book-info"><span className="info">Title: </span>"{book?.title}"</div>
          <div className="book-info"><span className="info">Author: </span>{book?.author}</div>
          <div className="book-info"><span className="info">Genre: </span>{book?.genre}</div>
          <div className="book-info"><span className="info">Owned By: </span><Link to={`/profile/${bookOwner?.id}`}><div className="owner">{bookOwner?.name}</div></Link></div>
          {isBorrowed() ? 
            (<div className="book-info"><span>Borrowed By: </span>{borrowedBook?.borrowerName}</div>) 
          : (<div className="book-info"><span>Location: </span>{book?.location?.shelf}</div>)
          }
          <div className="book-info read-status">
            <div className="book-info">
              <span>Read Status: </span>
              {isRead() ? ("Read") : ("Unread")}
            </div>
            <label for="read">Change Status</label>
            <input type="checkbox" name="read" checked={isRead()} onChange={handleCheck} />
          </div>
        </div>
      </div>
      <div className="btn-container">
        <Button variant="primary" className="detail-btn" onClick={handleEdit}>Edit Book</Button>
        <Button variant="danger" className="detail-btn" onClick={handleDelete}>Delete Book</Button>
        {isBorrowed() ? 
          (<ReturnBookModal bookId={bookId} borrowedBook={borrowedBook} getAllBorrowedBooks={getAllBorrowedBooks}/>) 
          : 
          (<LoanBookModal bookId={bookId} getAllBorrowedBooks={getAllBorrowedBooks}/>)
        }
      </div>

    </div>
  )
}