import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByUserId, updateProfile } from "../services/userServices"

export const EditProfile = ({currentUser}) => {
  const [user, setUser] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getUserByUserId(currentUser?.id).then(data => {
      setUser(data[0])
    })
  }, [currentUser])

  const handleInputChange = (event) => {
    const stateCopy = {...user}
    stateCopy[event.target.name] = event.target.value
    setUser(stateCopy)
  }

  const handleSave = () => {
    if (user.name !== "" && user.email !== "") {
      updateProfile(user).then(navigate(`/profile`))
    }
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-username">
          <h2>Name: </h2>
          <input 
            type="text" 
            name="name"
            required
            value={user?.name ? user.name : ""} 
            onChange={handleInputChange}
          />
        </div>
        <div className="profile-email">
          <h2>Email: </h2>
          <input 
            type="text"
            name="email"
            value={user?.email ? user.email : ""} 
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <input
          type="submit"
          className="profile-save"
          value="Save Profile"
          onClick={handleSave}
        />
    </div>
  )
}