import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { addShelf } from '../services/shelfService';

export const AddShelfModal = ({getAndSetAllShelves}) => {
  const [show, setShow] = useState(false);
  const [shelfName, setShelfName] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddShelfBtn = () => {
    const shelfObj = {shelf: shelfName}
    addShelf(shelfObj)
      .then(() => getAndSetAllShelves()) // Wrapped the function in a callback, ensures they are executed after addShelf Promise has resolved
      .then(() => handleClose())
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +Add Shelf
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Shelf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Name of Shelf: </Form.Label>
              <Form.Control type="text" onChange={e => setShelfName(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => handleClose(e)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddShelfBtn}>Save Shelf</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}