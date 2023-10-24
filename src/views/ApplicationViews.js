import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { BookList } from "../components/books/BookList"
import { NavBar } from "../components/nav/NavBar"
import { BookDetails } from "../components/books/BookDetails"
import { AddBook } from "../components/forms/AddBook"
import { EditBook } from "../components/forms/EditBook"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localUser = localStorage.getItem("bookhoarder_user")
    const userObj = JSON.parse(localUser)
    setCurrentUser(userObj)
  }, [])

  return (
    <Routes>
      <Route path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<BookList />} />
        <Route path="book">
          <Route path=":bookId" element={<BookDetails currentUser={currentUser} />} />
        </Route>
        <Route path="addbook" element={<AddBook />}/>
        <Route path="editbook">
          <Route path=":bookId" element={<EditBook />} />
        </Route>
      </Route>
    </Routes>
  )
}