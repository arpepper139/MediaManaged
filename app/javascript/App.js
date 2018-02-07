import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MediaIndexContainer from './containers/MediaIndexContainer'
import MediaShowContainer from './containers/MediaShowContainer'
import NewMediaContainer from './containers/NewMediaContainer'

const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={MediaIndexContainer} />
      <Route path='/home' component={MediaIndexContainer} />
      <Route path='/media/new' component={NewMediaContainer} />
      <Route path='/movies/:id' component={MediaShowContainer} />
      <Route path='/shows/:id' component={MediaShowContainer} />
    </Router>
  )
}

export default App
