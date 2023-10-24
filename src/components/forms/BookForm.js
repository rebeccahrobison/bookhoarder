import { useEffect, useState } from "react"
import { getAllUsers } from "../services/userServices"
import { getAllShelves } from "../services/shelfService"

export const BookForm = ({book, setBook, userBook, setUserBook}) => {
  const [users, setUsers] = useState([])
  const [shelves, setShelves] = useState([])
  const [owner, setOwner] = useState({})


  const getAndSetAllUsers = () => {
    getAllUsers().then(data => setUsers(data))
  }

  const getAndSetAllShelves = () => {
    getAllShelves().then(data => setShelves(data))
  }

  useEffect(() => {
    getAndSetAllUsers()
  }, [])

  useEffect(() => {
    getAndSetAllShelves()
  }, [])


  return (
    <form className="book-form">
        <fieldset>
          <div className="form-group">
            <label>Title:</label>
            <input 
              type="text" 
              value={book.title} 
              className="form-control"
              onChange={(e) => {
                const bookCopy = {...book}
                bookCopy.title = e.target.value
                setBook(bookCopy)
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>Author:</label>
            <input 
              type="text" 
              value={book.author} 
              className="form-control" 
              onChange={(e) => {
                const bookCopy = {...book}
                bookCopy.author = e.target.value
                setBook(bookCopy)
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>Genre:</label>
            <input 
              type="text" 
              value={book.genre} 
              className="form-control" 
              onChange={(e) => {
                const bookCopy = {...book}
                bookCopy.genre = e.target.value
                setBook(bookCopy)
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>Cover Image:</label>
            <input 
              type="text" 
              value={book.cover} 
              className="form-control" 
              onChange={(e) => {
                const bookCopy = {...book}
                bookCopy.cover = e.target.value
                setBook(bookCopy)
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>Owned By:</label>
            <select 
              name="userId" 
              id="owners"
              value={userBook.userId}
              onChange={(e) => {
                const userBookCopy = {...userBook}
                userBookCopy.userId = parseInt(e.target.value)
                // userBookCopy.bookId = userBooks?.length + 1
                setUserBook(userBookCopy)
              }}
            >
              <option className="form-group" value="0">Choose an Owner</option>
              {users.map(user => {
                return(
                  <option key={user.id} value={user.id}>{user.name}</option>
                )
              })}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>Shelf:</label>
            <select 
              name="userId" 
              id="shelves" 
              value={book.locationId} 
              onChange={(e) => {
                const bookCopy = {...book}
                bookCopy.locationId = parseInt(e.target.value)
                setBook(bookCopy)
              }}
            >
              <option className="form-group" value="0">Choose a Shelf</option>
              {shelves.map(shelf => {
                return (
                  <option key={shelf.id} value={shelf.id}>{shelf.shelf}</option>
                )
              })}
            </select>
            <button>+Add Shelf</button>
          </div>
        </fieldset>
      </form>
  )
}