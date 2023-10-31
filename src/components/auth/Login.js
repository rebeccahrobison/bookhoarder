import "./Login.css"
import { LoginModal } from "../modals/LoginModal"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { RegisterModal } from "../modals/RegisterModal"
// import logo from "public/images/bookshelf.jpg"

export const Login = () => {
  const navigate = useNavigate()

  // const handleRegisterBtn = () => {
  //   navigate("/register")
  // }
  
  return (
      <div className="container-login">
        <div className="img-container">
        </div>
        <section>
          <header>
            <img src="/images/BookHoarderTag.png" className="" alt="BookHoarder logo"/>      
          </header>
          <div className="buttons-container">
            <LoginModal />
            <RegisterModal />
            {/* <Button className="register" variant="secondary" onClick={handleRegisterBtn}>Register</Button> */}
          </div>
          <footer>"Never lose a book again"</footer>
        </section>
      </div>
  )
}
