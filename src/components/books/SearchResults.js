import { Link, useLocation } from "react-router-dom"

export const SearchResults = () => {

  const location = useLocation()
  const filteredBooks = location.state
  
  
  return (
    <div className="booklist-container">
      <div className="booklist">
        {filteredBooks.map(bookObj => {
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