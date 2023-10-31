import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllUsers } from "../services/userServices"
import { getUserBooksByUserId } from "../services/userBookServices"
import { getUserReadBooksByUserId } from "../services/userReadServices"
import "./Profile.css"
import { Button } from "react-bootstrap"

export const Profile = ({ currentUser }) => {
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
    if (!userId) {
      const foundUser = users.find(user => user.id === currentUser.id)
      setUser(foundUser)
    } else if (userId) {
      const foundUser = users.find(user => user.id == userId)
      setUser(foundUser)
    }
  }, [currentUser, users, userId])

  useEffect(() => {
    if (user) {
      getUserBooksByUserId(user?.id).then(data => {
        setUserBooks(data)
      })
    }
  }, [user])

  useEffect(() => {
    if (user) {
      getUserReadBooksByUserId(user?.id).then(data => setUserReadBooks(data))
    }
  }, [user])

  const handleEditProfileBtn = () => {
    navigate(`/profile/edit`)
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-items-container">
        <div className="profile-items">
          <div className="profile-item">
            <h5>Name: </h5>
            <div className="user">{user?.name}</div>
          </div>
          <div className="profile-item">
            <h5>Email: </h5>
            <div className="email">{user?.email}</div>
          </div>
          <div className="profile-item">
            <h5>#Books Owned: </h5>
            <div className="books-owned">{userBooks?.length}</div>
          </div>
          <div className="profile-item">
            <h5>#Books Read: </h5>
            <div className="books-read">{userReadBooks?.length}</div>
          </div>
        </div>

      </div>
      {
        (!userId || currentUser?.id == userId) ? (
          <div className="profile-btns">
            <Button variant="secondary" onClick={handleEditProfileBtn}>Edit Profile</Button>
          </div>
        ) : (
          ""
        )
      }
    </div>
  )
}