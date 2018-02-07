import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MediaIndexContainer from './containers/MediaIndexContainer'
import MovieShowContainer from './containers/MovieShowContainer'
import ShowShowContainer from './containers/ShowShowContainer'

const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={MediaIndexContainer} />
      <Route path='/home' component={MediaIndexContainer} />
      <Route path='/movies/:id' component={MovieShowContainer} />
      <Route path='/shows/:id' component={ShowShowContainer} />
    </Router>
  )
}

export default App
