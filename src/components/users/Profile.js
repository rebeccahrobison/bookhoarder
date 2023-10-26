import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllUsers } from "../services/userServices"
import { getUserBooksByUserId } from "../services/userBookServices"

export const Profile = ({currentUser}) => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [userReadBooks, setUserReadBooks] = useState([])

  const userId = useParams().userId
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers().then(usersArr => {
      setUsers(usersArr)
    })
  }, [])

  useEffect(() => {
    console.log("userId", userId)
    if(!userId) {
      const foundUser = users.find(user => user.id === currentUser.id)
      setUser(foundUser)
    } else if (userId) {
      const foundUser = users.find(user => user.id == userId)
      setUser(foundUser)
    }
  }, [currentUser, users, userId])

  useEffect(() => {
    console.log(user?.id)
    if(user) {
      getUserBooksByUserId(user?.id).then(data => {
        console.log("data", data)
        setUserReadBooks(data)})
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
          <div className="books-owned">{userReadBooks?.length}</div>
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