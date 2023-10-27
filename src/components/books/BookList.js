import { useEffect, useState } from "react"
import { getAllBooks, getBookByBookId } from "../services/bookServices"
import { FilterBar } from "./FilterBar"
import "./BookList.css"
import { Link } from "react-router-dom"
import { getUserBooksByUserId } from "../services/userBookServices"

export const BookList = () => {
  const [allBooks, setAllBooks] = useState([])
  const [selectedOwner, setSelectedOwner] = useState({id: 0})
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    getAllBooks().then(data => setAllBooks(data))
  }, [])

  useEffect(() => {
    if (selectedOwner.id !== 0) {
      const filterBooks = async () => {
        const userBooks = await getUserBooksByUserId(selectedOwner.id)
        const userBookIds = userBooks.map(userBook => userBook.bookId)
        const foundBooks = allBooks.filter(book => userBookIds.includes(book.id))
        setFilteredBooks(foundBooks)
      }
        filterBooks()
    } else {
      setFilteredBooks(allBooks)
    }
    }
  , [selectedOwner, allBooks])

  return (
    <div className="booklist-container">
      <FilterBar selectedOwner={selectedOwner} setSelectedOwner={setSelectedOwner}/>
      <div className="booklist">
        {filteredBooks.map(bookObj => {
          return (
            <div key={bookObj.id}>
              <Link to={`/book/${bookObj?.id}`}>
                <div className="book">
                  <div id="book-info-cover" className="book-info cover"><img src={bookObj?.cover} alt="Cover of book"/></div>
                  <div className="book-info-container">
                    <div className="book-info title">{bookObj.title}</div>
                    <div className="book-info author">by {bookObj.author}</div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        )}
      </div>
    </div>
  )
}