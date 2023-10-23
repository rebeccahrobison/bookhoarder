import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBookByBookId } from "../services/bookServices"
import "./BookDetails.css"
import { getUserByUserId } from "../services/userServices"

export const BookDetails = () => {
  const [book, setBook] = useState({})
  const [bookOwner, setBookOwner] = useState({})
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getBookByBookId(bookId).then(data => setBook(data[0]))
  }, [bookId])

  useEffect(() => {
    if (book?.userBooks) {
      getUserByUserId(book?.userBooks[0]?.userId).then(data => setBookOwner(data[0]))
    }
  }, [book])

  const isBorrowed = () => {
    return true
  }

  return (
    <div className="book-details-container">
      <div className="book-details">
        <div className="book-cover">
          <img src={book.cover} />
        </div>
        <div className="book-info-container">
          <div className="book-info"><span>Title: </span>"{book.title}"</div>
          <div className="book-info"><span>Author: </span>{book.author}</div>
          <div className="book-info"><span>Genre: </span>{book.genre}</div>
          <div className="book-info"><span>Owned By: </span>{bookOwner.name}</div>
          <div className="book-info"><span>Location: </span>{book?.location?.shelf}</div>
          <div className="book-info"><span>Borrowed By: </span>{book.title}</div>
        </div>
      </div>
      <button>Edit Book</button>
      <button>Loan Book</button>

    </div>
  )
}

// Book Cover on left
// Title:
// Author:
// Genre:
// Owned By: username link
// Location: renders if not borrowed
// Borrowed By: renders if borrowed
// Read Status: 
// Read Status Checkbox
// Edit Book Details Button
// Loan Book Button / Return Book Button