import { Link, useLocation, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react"
import { getAllBooks } from "../services/bookServices"
import { Button } from "react-bootstrap"

export const NavBar = () => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

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
    navigate("/search", { state: { filteredBooks, searchTerm } })
    setSearchTerm("")
  }

  return (
    <div>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link className="navbar-link" to="/">
            <img src="/images/BookHoarderLogo.png" alt="BookHoarder Logo" />
          </Link>
        </div>
        <ul className="navbar-items">
          <li className="navbar-item">
            <form>
              <input
                type="text"
                value={searchTerm}
                placeholder="Search Your Book Hoard"
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Button className="primary" type="submit" onClick={e => handleSearch(e)} value="Search">Search</Button>
            </form>

          </li>
          <Link className="navbar-link" to="/addbook">
            <li className="navbar-item addbook">
              <span class="material-symbols-outlined">
                library_add
              </span></li>
          </Link>
          <Link className="navbar-link" to="/profile">
            <li className="navbar-item profile"><span class="material-symbols-outlined">
person
</span></li>
          </Link>

          {localStorage.getItem("bookhoarder_user") ? (
            <li className="navbar-item">
              <Link
                className="navbar-link logout"
                to=""
                onClick={() => {
                  localStorage.removeItem("bookhoarder_user")
                  navigate("/login", { replace: true })
                }}
              ><span class="material-symbols-outlined">
              logout
              </span>
              </Link>
            </li>
          ) : ("")}
        </ul>
      </div>
    </div>
  )
}