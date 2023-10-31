import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllUsers } from "../services/userServices"
import { getUserReadBooksByUserId } from "../services/userReadServices"

export const FilterBar = ({ 
    selectedOwner, 
    setSelectedOwner, 
    filteredBooks, 
    setFilteredBooks, 
    currentUser,
    allBooks
  }) => {
  const [owners, setOwners] = useState([])
  const [userReadBooks, setUserReadBooks] = useState([])

  useEffect(() => {
    getAllUsers().then(data => setOwners(data))
  }, [])

  useEffect(() => {
    getUserReadBooksByUserId(currentUser?.id).then(data => setUserReadBooks(data))
  }, [currentUser])

  const handleSort = (e) => {
    const selectedValue = parseInt(e.target.value)
    if (selectedValue === 0) {
      setFilteredBooks(allBooks)
    }

    if (selectedValue === 1) { //Alphabetize by Title with out articles
      const ignoreArticles = ["a", "an", "the"]

      const customCompare = (a, b) => {
        const removeArticles = (title) => {
          const lowerTitle = title.toLowerCase()
          for (const article of ignoreArticles) {
            if (lowerTitle.startsWith(article + " ")) {
              return title.slice(article.length + 1)
            }
          }
          return title
        }
        const titleA = removeArticles(a.title)
        const titleB = removeArticles(b.title)

        return titleA.localeCompare(titleB)
      }
      const alphabetizedByTitle = [...filteredBooks].sort(customCompare)
        // (a, b) => a.title?.toLowerCase().localeCompare(b.title?.toLowerCase()))
      setFilteredBooks(alphabetizedByTitle)
    }

    if (selectedValue === 2) { //Alphabetize by Author
      const alphabetizedByAuthor = [...filteredBooks].sort((a, b) => {
        const lastNameA = a.author.split(" ").pop()
        const lastNameB = b.author.split(" ").pop()
        return lastNameA.toLowerCase().localeCompare(lastNameB.toLowerCase())
      })
      setFilteredBooks(alphabetizedByAuthor)
    }

    if (selectedValue === 3) { // Only show Read Books
      const foundUserReadBooks = userReadBooks.map(u =>
        filteredBooks.find(f => u.bookId === f.id)
        ).filter(book => book !== undefined)
      setFilteredBooks(foundUserReadBooks)
    }

    if (selectedValue === 4) { // Only show Unread Books
      const foundUnreadBooks = filteredBooks.filter(f =>
        !userReadBooks.some(u => u.bookId === f.id))
      setFilteredBooks(foundUnreadBooks)
    }
  }


  return (
    <div className="filter-bar">
      <Link to={`/addbook`}><span className="add-book">+Add A New Book</span></Link>
      <div className="dropdowns">
        <fieldset>
          {/* <span>Sort By: </span> */}
          <select id="sort" onChange={e => handleSort(e)}>
            <option value="0">Sort by...</option>
            <option value="1">Title Alphabetically</option>
            <option value="2">Author Alphabetically</option>
            <option value="3">Read Books</option>
            <option value="4">Unread Books</option>
          </select>
        </fieldset>
        <fieldset>
          {/* <span>Filter By: </span> */}
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