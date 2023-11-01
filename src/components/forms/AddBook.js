import { useEffect, useState } from "react"
import { BookForm } from "./BookForm"
import { addBook, getBookByTitle } from "../services/bookServices"
import { useNavigate } from "react-router-dom"
import { addUserBook } from "../services/userBookServices"
import { Button } from "react-bootstrap"
import { BarcodeScanner } from "../scanner/BarcodeScanner"
import { getGoogleBookData } from "../services/barcodeServices"

export const AddBook = () => {
  const [book, setBook] = useState(
    { 
      title: "", 
      author: "", 
      cover: "", 
      genre: "", 
      locationId: 0 
    }
  )
  const [userBook, setUserBook] = useState(
    { bookId: 0, userId: 0 }
  )
  const [barcode, setBarcode] = useState(0)
  const [googleBook, setGoogleBook] = useState([])
  const [showScanner, setShowScanner] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (barcode) {
      getGoogleBookData(barcode).then(data => {
        if(data?.items && data.items.length > 0) {
          setGoogleBook(data?.items[0])
        } else {
          console.error("No items were found in the Google Book data.")
        }
      })
    }
  }, [barcode])

  useEffect(() => {
    if (googleBook) {
      try {
        const volumeInfo = googleBook.volumeInfo || {}
        const authors = volumeInfo.authors || []
        const categories = volumeInfo.categories || []
        const imageLinks = volumeInfo.imageLinks || {}
  
        if (!volumeInfo.title || authors.length === 0 || categories.length === 0 || !imageLinks.thumbnail) {
          throw new Error('Incomplete Google Book data: Missing required fields')
        }
  
  
        const bookObj = {
          title: googleBook?.volumeInfo?.title,
          author: googleBook?.volumeInfo?.authors[0],
          genre: googleBook?.volumeInfo?.categories[0],
          cover: googleBook?.volumeInfo?.imageLinks?.thumbnail,
          locationId: 0
        }
        setBook(bookObj)
      } catch (error) {
        console.error(error)
      }

      }
  }, [googleBook])


  const handleUseBarcodeScannerBtn = () => {
    setShowScanner(!showScanner)
  }

  const handleAddBook = async (e) => {
    e.preventDefault()

    if (book.title === "" || book.author === "" || book.genre === "" || book.cover === "" || book.locationId === 0) {
      window.alert("Please fill out all fields")
      return
    }

    await addBook(book)
    const postedBook = await getBookByTitle(book.title)
    userBook.bookId = postedBook[0].id
    addUserBook(userBook).then(navigate(`/`))
  }

  const handleCancelBtn = () => {
    navigate("/")
  }

  return (
    <div className="addbook-container">
      <h2>Add A New Book To Your Hoard</h2>
      <BookForm book={book} setBook={setBook} userBook={userBook} setUserBook={setUserBook} />
      {showScanner ?
        <BarcodeScanner setBarcode={setBarcode} showScanner={showScanner} />
        :
        ""
      }
      <div className="buttons-container">
        <Button variant="primary" onClick={e => { handleAddBook(e) }}>Add Book</Button>
        {showScanner ?
          <Button variant="secondary" onClick={handleUseBarcodeScannerBtn}>Close Barcode Scanner</Button>
          :
          <Button variant="secondary" onClick={handleUseBarcodeScannerBtn}>Use Barcode Scanner</Button>
        }
        <Button variant="danger" onClick={handleCancelBtn}>Cancel</Button>
      </div>
    </div>
  )
}

// Form items
// Title: textbox
// Author: textbox
// Genre: textbox
// Cover Image: textbox
// Owned By: dropdown
// Shelf: dropdown
// Read Status: dropdown
// Add Shelf button
// Cancel button navigates to BookList
// Save Book navigates to BookList
// TODO: Barcode scanner button
