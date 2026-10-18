import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import './index.css'

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    const searchValue = searchInput.trim()

    if (searchValue !== '') {
      history.push(`/search/${encodeURIComponent(searchValue)}`)
    }
  }

  const onSubmitSearch = event => {
    event.preventDefault()
    onClickSearch()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <h1>movieDB</h1>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Popular
          </Link>

          <Link to="/top-rated" className="nav-link">
            Top Rated
          </Link>

          <Link to="/upcoming" className="nav-link">
            Upcoming
          </Link>
        </div>

        <form className="search-container" onSubmit={onSubmitSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={onChangeSearchInput}
            className="search-input"
            aria-label="Search movies"
          />

          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
