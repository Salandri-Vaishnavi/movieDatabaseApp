import {useHistory} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movie} = props
  const history = useHistory()

  const onClickViewDetails = () => {
    history.push(`/movie/${movie.id}`)
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} className="movie-poster" />

      <h2 className="movie-title">{movie.title}</h2>

      <p className="movie-rating">{movie.vote_average}</p>

      <button
        type="button"
        className="details-button"
        onClick={onClickViewDetails}
      >
        View Details
      </button>
    </div>
  )
}

export default MovieCard
