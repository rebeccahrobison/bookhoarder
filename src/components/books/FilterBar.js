import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllUsers } from "../services/userServices"

export const FilterBar = ({ selectedOwner, setSelectedOwner }) => {
  const [owners, setOwners] = useState([])

  useEffect(() => {
    getAllUsers().then(data => setOwners(data))
  }, [])
  
  
  return (
    <>
      <Link to={`/addbook`}>+Add New Book</Link>
      <fieldset>
        <select name="ownerId"
          id="owners"
          value={selectedOwner.id}
          onChange={(e) => {
            const selectedOwnerCopy = {...selectedOwner}
            selectedOwnerCopy.id = parseInt(e.target.value)
            setSelectedOwner(selectedOwnerCopy)
          }}
        >
          <option value="0">Filter by owner</option>
          {owners.map(owner => {
            return (
              <option value={owner.id} key={owner.id}>{owner.name}</option>
            )
          })}
        </select>
      </fieldset>

    </>
  )
}