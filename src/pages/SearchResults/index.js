import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import MovieCard from '../../components/MovieCard'

import '../Home/index.css'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY

const SearchResults = () => {
  const {query} = useParams()

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const getSearchedMovies = async () => {
      setIsLoading(true)
      setErrorMsg('')

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query,
          )}&page=${page}`,
        )

        const data = await response.json()

        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch (error) {
        setErrorMsg('Something went wrong. Please try again.')
      }

      setIsLoading(false)
    }

    getSearchedMovies()
  }, [query, page])

  const onClickPrevious = () => {
    if (page > 1) {
      setPage(page - 1)
      window.scrollTo(0, 0)
    }
  }

  const onClickNext = () => {
    if (page < totalPages) {
      setPage(page + 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Search Results</h1>

      {isLoading && <p className="status-message">Loading...</p>}

      {errorMsg !== '' && <p className="error-message">{errorMsg}</p>}

      {!isLoading && errorMsg === '' && movies.length === 0 && (
        <p className="status-message">No movies found.</p>
      )}

      {!isLoading && errorMsg === '' && movies.length > 0 && (
        <>
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="pagination">
            <button
              type="button"
              className="pagination-button"
              onClick={onClickPrevious}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="page-number">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              className="pagination-button"
              onClick={onClickNext}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResults
