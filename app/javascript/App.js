import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import OwnershipsIndexContainer from './containers/OwnershipsIndexContainer'

const App = (props) => {

  return(
    <Router history={browserHistory}>
      <Route path='/' component={OwnershipsIndexContainer} />
      <Route path='/home' component={OwnershipsIndexContainer} />
    </Router>
  )
}

export default App;
