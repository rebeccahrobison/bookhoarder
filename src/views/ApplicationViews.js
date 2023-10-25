import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { BookList } from "../components/books/BookList"
import { NavBar } from "../components/nav/NavBar"
import { BookDetails } from "../components/books/BookDetails"
import { AddBook } from "../components/forms/AddBook"
import { EditBook } from "../components/forms/EditBook"
import { Profile } from "../components/users/Profile"
import { EditProfile } from "../components/forms/EditProfile"
import { SearchResults } from "../components/books/SearchResults"

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
        <Route path="profile">
          <Route index element={<Profile currentUser={currentUser}/>} />
          <Route path=":userId" element={<Profile currentUser={currentUser}/>} />
          <Route path="edit" element={<EditProfile currentUser={currentUser}/>} />
        </Route>
        <Route path="search" element={<SearchResults />} />
      </Route>
    </Routes>
  )
}