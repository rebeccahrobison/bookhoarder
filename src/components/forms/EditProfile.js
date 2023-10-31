import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByUserId, updateProfile } from "../services/userServices"
import { Button } from "react-bootstrap"

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
      <h2>Profile</h2>
      <div className="profile-info-container">
        <div className="profile-info">
          <h5>Name: </h5>
          <input 
            type="text" 
            name="name"
            required
            value={user?.name ? user.name : ""} 
            onChange={handleInputChange}
          />
        </div>
        <div className="profile-info">
          <h5>Email: </h5>
          <input 
            type="text"
            name="email"
            value={user?.email ? user.email : ""} 
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button variant="danger" onClick={handleSave}>Save Profile</Button>
    </div>
  )
}