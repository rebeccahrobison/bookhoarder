import { useEffect, useState } from "react"
import { getAllUsers } from "../services/userServices"
import { getAllShelves } from "../services/shelfService"
import { AddShelfModal } from "../modals/AddShelfModal"
import "./BookForm.css"

export const BookForm = ({ book, setBook, userBook, setUserBook }) => {
  const [users, setUsers] = useState([])
  const [shelves, setShelves] = useState([])


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

  const handleInputChange = (e) => {
    const stateCopy = { ...book }
    if (e.target.name === "locationId") {
      stateCopy[e.target.name] = parseInt(e.target.value)
    } else {
      stateCopy[e.target.name] = e.target.value
    }
    setBook(stateCopy)
  }


  return (
    <form className="book-form">
      <fieldset>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            className="form-control"
            onChange={handleInputChange
            }
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            className="form-control"
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            className="form-control"
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Cover Image:</label>
          <input
            type="text"
            name="cover"
            value={book.cover}
            className="form-control form-cover"
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
          <div className="form-group-img">
            {(!book.cover) ?
              <img src="https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png" alt="Book cover placeholder"/>
              :
              <img src={book.cover} alt="Book cover"/>
            }
          </div>
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
              const userBookCopy = { ...userBook }
              userBookCopy.userId = parseInt(e.target.value)
              setUserBook(userBookCopy)
            }}
          >
            <option className="form-group" value="0">Choose an Owner</option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.id}>{user.name}</option>
              )
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Shelf:</label>
          <div className="addshelf-container">
            <select
              name="locationId"
              id="shelves"
              value={book.locationId}
              onChange={(e) => {
                handleInputChange(e)
              }}
            >
              <option className="form-group" value="0">Choose a Shelf</option>
              {shelves.map(shelf => {
                return (
                  <option key={shelf.id} value={shelf.id}>{shelf.shelf}</option>
                )
              })}
            </select>
            <AddShelfModal getAndSetAllShelves={getAndSetAllShelves} />
          </div>
        </div>
      </fieldset>
    </form>
  )
}