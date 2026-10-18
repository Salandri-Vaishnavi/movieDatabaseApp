import {Route, Switch} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import SearchResults from './pages/SearchResults'
import MovieDetails from './pages/MovieDetails'

import './App.css'

const App = () => (
  <>
    <Navbar />

    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/top-rated" component={TopRated} />

      <Route path="/upcoming" component={Upcoming} />

      <Route path="/search/:query" component={SearchResults} />

      <Route path="/movie/:id" component={MovieDetails} />
    </Switch>
  </>
)

export default App
