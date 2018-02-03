import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import OwnershipsIndexContainer from './containers/OwnershipsIndexContainer'
import MoviesIndexContainer from './containers/MoviesIndexContainer'
import ShowsIndexContainer from './containers/ShowsIndexContainer'

const App = (props) => {

  return(
    <Router history={browserHistory}>
      <Route path='/' component={OwnershipsIndexContainer} />
      <Route path='/home' component={OwnershipsIndexContainer} />
      <Route path='/movies' component={MoviesIndexContainer} />
      <Route path='/shows' component={ShowsIndexContainer} />
    </Router>
  )
}

export default App;
