import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MediaIndexContainer from './containers/MediaIndexContainer'
import MediaPreview from './components/MediaPreview'
import MovieShowTile from './components/MovieShowTile'
import ShowShowTile from './components/ShowShowTile'

const App = (props) => {

  return(
    <Router history={browserHistory}>
      <Route path='/' component={MediaIndexContainer} />
      <Route path='/home' component={MediaIndexContainer} />
      <Route path='/movies/:id' component={MovieShowTile} />
      <Route path='/shows/:id' component={ShowShowTile} />
    </Router>
  )
}

export default App;
