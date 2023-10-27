import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllUsers } from "../services/userServices"
import { getUserBooksByUserId } from "../services/userBookServices"
import { getUserReadBooksByUserId } from "../services/userReadServices"

export const Profile = ({currentUser}) => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [userBooks, setUserBooks] = useState([])
  const [userReadBooks, setUserReadBooks] = useState([])

  const userId = useParams().userId
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers().then(usersArr => {
      setUsers(usersArr)
    })
  }, [])

  useEffect(() => {
    if(!userId) {
      const foundUser = users.find(user => user.id === currentUser.id)
      setUser(foundUser)
    } else if (userId) {
      const foundUser = users.find(user => user.id == userId)
      setUser(foundUser)
    }
  }, [currentUser, users, userId])

  useEffect(() => {
    if(user) {
      getUserBooksByUserId(user?.id).then(data => {
        setUserBooks(data)})
    }
  }, [user])

  useEffect(() => {
    if(user) {
      getUserReadBooksByUserId(user?.id).then(data => setUserReadBooks(data))
    }
  }, [user])

  const handleEditProfileBtn = () => {
    navigate(`/profile/edit`)
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-username">
          <h2>Name: </h2>
          <div className="user">{user?.name}</div>
        </div>
        <div className="profile-email">
          <h2>Email: </h2>
          <div className="email">{user?.email}</div>
        </div>
        <div className="profile-books">
          <h2>Number of Books Owned: </h2>
          <div className="books-owned">{userBooks?.length}</div>
        </div>
        <div className="profile-books">
          <h2>Number of Books Read: </h2>
          <div className="books-read">{userReadBooks?.length}</div>
        </div>
      </div>
      {
        (!userId || currentUser?.id == userId) ? (
          <div className="profile-btns">
            <button className="edit-btn" onClick={handleEditProfileBtn}>Edit Profile</button>
          </div>
        ) : (
          ""
        )
      }
    </div>
  )
}