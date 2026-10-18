import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import './index.css'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY

const MovieDetails = () => {
  const {id} = useParams()

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true)
      setErrorMsg('')

      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        )

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        )

        const movieData = await movieResponse.json()
        const castData = await castResponse.json()

        setMovie(movieData)
        setCast(castData.cast)
      } catch (error) {
        setErrorMsg('Something went wrong. Please try again.')
      }

      setIsLoading(false)
    }

    getMovieDetails()
  }, [id])

  if (isLoading) {
    return <p className="status-message">Loading...</p>
  }

  if (errorMsg !== '') {
    return <p className="error-message">{errorMsg}</p>
  }

  if (!movie) {
    return <p className="status-message">Movie not found.</p>
  }

  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60

  return (
    <div className="movie-details-page">
      <section className="movie-details-section">
        <div className="movie-details-image-container">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="movie-details-image"
          />
        </div>

        <div className="movie-details-content">
          <h1 className="movie-details-title">{movie.title}</h1>

          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>

          <p>
            <strong>Duration:</strong> {hours}h {minutes}m
          </p>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Genre:</strong>{' '}
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>

          <h2>Overview</h2>

          <p className="overview">{movie.overview}</p>
        </div>
      </section>

      <section className="cast-section">
        <h2 className="cast-title">Cast</h2>

        <div className="cast-grid">
          {cast.slice(0, 20).map(member => (
            <div className="cast-card" key={member.credit_id}>
              <img
                src={member.profile_path}
                alt={member.name}
                className="cast-image"
              />

              <div className="cast-content">
                <h3>{member.name}</h3>

                <p>as {member.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MovieDetails
