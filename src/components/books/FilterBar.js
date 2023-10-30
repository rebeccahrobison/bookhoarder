import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllUsers } from "../services/userServices"

export const FilterBar = ({ selectedOwner, setSelectedOwner, filteredBooks, setFilteredBooks }) => {
  const [owners, setOwners] = useState([])

  useEffect(() => {
    getAllUsers().then(data => setOwners(data))
  }, [])

  const handleSort = (e) => {
    const selectedValue = parseInt(e.target.value)
    console.log(selectedValue)
    if (selectedValue === 1) {
      const alphabetizedByTitle = [...filteredBooks].sort((a, b) => 
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
      setFilteredBooks(alphabetizedByTitle)
    }
    if (selectedValue === 2) {
      const alphabetizedByAuthor = [...filteredBooks].sort((a, b) => {
        const lastNameA = a.author.split(" ").pop()
        const lastNameB = b.author.split(" ").pop()
        return lastNameA.toLowerCase().localeCompare(lastNameB.toLowerCase())
      })
      setFilteredBooks(alphabetizedByAuthor)
    }
    if (selectedValue === 3) {
      
    }
  }

  return (
    <div className="filter-bar">
      <Link to={`/addbook`}><span className="add-book">+Add A New Book</span></Link>
      <div className="dropdowns">
        <fieldset>
          <span>Sort By: </span>
          <select id="sort" onChange={e => handleSort(e)}>
            <option value="0">Sort by...</option>
            <option value="1">Title Alphabetically</option>
            <option value="2">Author Alphabetically</option>
            <option value="3">Read Books</option>
            <option value="4">Unread Books</option>
          </select>
        </fieldset>
        <fieldset>
          <span>Filter By: </span>
          <select name="ownerId"
            id="owners"
            value={selectedOwner.id}
            onChange={(e) => {
              const selectedOwnerCopy = { ...selectedOwner }
              selectedOwnerCopy.id = parseInt(e.target.value)
              setSelectedOwner(selectedOwnerCopy)
            }}
          >
            <option value="0">Filter by owner</option>
            {owners.map(owner => {
              return (
                <option value={owner.id} key={owner.id}>{owner.name}'s Books</option>
              )
            })}
          </select>
        </fieldset>

      </div>
    </div>
  )
}