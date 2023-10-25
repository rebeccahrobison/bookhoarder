import { Link, useLocation, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react"
import { getAllBooks } from "../services/bookServices"

export const NavBar = () => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  // const location = useLocation()

  useEffect(() => {
    getAllBooks().then(data => setBooks(data))
  }, [])

  useEffect(() => {
    const foundBooks = books.filter(book => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFilteredBooks(foundBooks)
    }, [books, searchTerm])

    const handleSearch = (e) => {
      e.preventDefault()
      // if (location.pathname !== "/search") {
          navigate("/search", { state: filteredBooks })
      // }
    }

  return (
    <div>
      <div className="navbar">
        <div className="navbar-logo">
          <Link className="navbar-link" to="/">
            <img src="/images/BookHoarder.png" alt="BookHoarder Logo"/>
          </Link>
        </div>
        <ul className="navbar-items">
          <li className="navbar-item">
            <form>
              <input 
                type="text" 
                placeholder="Search Your Book Hoard" 
                onChange={e => setSearchTerm(e.target.value)}
              />
              <input type="submit" onClick={e => handleSearch(e)} value="Search"/>
            </form>
            
          </li>
          <Link className="navbar-link" to="/profile">
            <li className="navbar-item">Profile</li>
          </Link>
          
          {localStorage.getItem("bookhoarder_user") ? (
            <li className="navbar-item">
              <Link
                className="navbar-link"
                to=""
                onClick={() => {
                  localStorage.removeItem("bookhoarder_user")
                  navigate("/login", {replace: true})
                }}
              >Logout
              </Link>
            </li>
          ) : ( "" )}
        </ul>
      </div>
    </div>
  )
}