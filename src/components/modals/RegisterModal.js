import { useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../services/userServices"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

export const RegisterModal = () => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({
    email: "",
    name: "",
  })


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = user

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "bookhoarder_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  // const handleCancelBtn = () => {
  //   navigate("/login")
  // }


  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Register
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>BookHoarder Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName" onChange={e => updateUser(e)}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Name" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => updateUser(e)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => handleClose(e)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>Register</Button>
        </Modal.Footer>
      </Modal>

      {/* <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">BookHoarder</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
      <div>
        <button type="submit" onClick={handleCancelBtn}>Cancel</button>
      </div>
    </main> */}
    </>
  )
}