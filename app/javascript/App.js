import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import HomePageContainer from './containers/HomePageContainer'
import ShowPageContainer from './containers/ShowPageContainer'
import AddPageContainer from './containers/AddPageContainer'

const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={HomePageContainer} />
      <Route path='/home' component={HomePageContainer} />
      <Route path='/media/new' component={AddPageContainer} />
      <Route path='/movies/:id' component={ShowPageContainer} />
      <Route path='/shows/:id' component={ShowPageContainer} />
    </Router>
  )
}

export default App
