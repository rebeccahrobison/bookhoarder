import { Link, useLocation } from "react-router-dom"
import "./SearchResults.css"

export const SearchResults = () => {

  const location = useLocation()
  const filteredBooks = location.state.filteredBooks
  const searchTerm = location.state.searchTerm
  
  
  return (
    <div className="booklist-container">
      <h2>Search Results of "{searchTerm}"</h2>
      <div className="booklist">
        {filteredBooks.map(bookObj => {
          return (
            <Link to={`/book/${bookObj.id}`} key={bookObj.id}>
              <div className="book">
                <div id="book-info-cover" className="book-info cover">
                  <img src={bookObj.cover} alt="Cover of book"/>
                </div>
                <div className="book-info-container">
                  <div className="book-info title">{bookObj.title}</div>
                  <div className="book-info author">by {bookObj.author}</div>
                </div>
              </div>
            </Link>
          )}
        )}
      </div>
    </div>
  )
}