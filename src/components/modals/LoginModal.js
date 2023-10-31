import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

import { getUserByEmail } from "../services/userServices"
import { useNavigate } from 'react-router-dom';

export const LoginModal = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if(foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "bookhoarder_user",
          JSON.stringify({
            id: user.id
          })
        )
        handleClose()
        navigate("/")
      } else {
        window.alert("Invalid Login")
      }
    })
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Login
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>BookHoarder Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => handleClose(e)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}