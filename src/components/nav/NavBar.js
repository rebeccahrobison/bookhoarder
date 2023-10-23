import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

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
            <input type="text" placeholder="Search"/>
          </li>
          <li className="navbar-item">Profile</li>
          
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