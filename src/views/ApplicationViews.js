import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { BookList } from "../components/books/BookList"
import { NavBar } from "../components/nav/NavBar"
import { BookDetails } from "../components/books/BookDetails"

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

      </Route>
    </Routes>
  )
}