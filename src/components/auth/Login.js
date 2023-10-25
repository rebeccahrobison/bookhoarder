import "./Login.css"
import { LoginModal } from "../modals/LoginModal"
import { useNavigate } from "react-router-dom"
// import logo from "public/images/bookshelf.jpg"

export const Login = () => {
  const navigate = useNavigate()

  const handleRegisterBtn = () => {
    navigate("/register")
  }
  
  return (
      <div className="container-login">
        <div className="img-container">
        </div>
        <section>
          <header>
            <img src="/images/BookHoarder.png" className="" alt="BookHoarder logo"/>      
            <h1>Tame Your</h1>
            <h1>Home Library</h1>
          </header>
          <div className="buttons-container">
            <LoginModal />
            <button className="register" onClick={handleRegisterBtn}>Register</button>
          </div>
          <footer>"Never lose a book again"</footer>
        </section>
      </div>
  )
}
