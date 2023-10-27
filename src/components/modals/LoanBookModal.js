import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { addBorrowedBook } from '../services/borrowedServices';

// import { useNavigate } from 'react-router-dom';

export const LoanBookModal = ({ bookId, getAllBorrowedBooks }) => {
  const [show, setShow] = useState(false);
  const [borrowersName, setBorrowersName] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const navigate = useNavigate()

  const handleLoanBookBtn = () => {
    const borrowedBookObj = {bookId: parseInt(bookId), borrowerName: borrowersName}
    addBorrowedBook(borrowedBookObj).then(getAllBorrowedBooks()).then(handleClose())
  }

  return (
    <>
      <Button variant="secondary" className="detail-btn" onClick={handleShow}>
        Loan Book
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Loan Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Borrower's Name: </Form.Label>
              <Form.Control type="text" onChange={e => setBorrowersName(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={e => handleClose(e)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLoanBookBtn}>Loan Book</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}