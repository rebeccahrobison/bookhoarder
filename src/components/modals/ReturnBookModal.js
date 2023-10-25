import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBorrowedBook } from '../services/borrowedServices';


export const ReturnBookModal = ({ bookId, borrowedBooks, getAllBorrowedBooks, borrowedBook }) => {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReturnBookBtn = () => {
    deleteBorrowedBook(borrowedBook.id).then(getAllBorrowedBooks()).then(handleClose())
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Return Book
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
          <p>Return book that was borrowed by {borrowedBook?.borrowerName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => handleClose(e)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReturnBookBtn}>Return Book</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}