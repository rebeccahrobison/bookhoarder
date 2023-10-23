import { useEffect, useState } from "react"
import { getAllBooks } from "../services/bookServices"
import { FilterBar } from "./FilterBar"
import "./BookList.css"
import { Link } from "react-router-dom"

export const BookList = () => {
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    getAllBooks().then(data => setAllBooks(data))
  }, [])

  return (
    <div className="booklist-container">
      <FilterBar />
      <div className="booklist">
        {allBooks.map(bookObj => {
          return (
            <Link to={`/book/${bookObj.id}`} key={bookObj.id}>
              <div className="book">
                <div className="book-info"><img src={bookObj.cover} alt="Cover of book"/></div>
                <div>
                  <div className="book-info"><span>Title: </span>{bookObj.title}</div>
                  <div className="book-info"><span>Author: </span>{bookObj.author}</div>
                </div>
              </div>
            </Link>
          )}
        )}
      </div>
    </div>
  )
}