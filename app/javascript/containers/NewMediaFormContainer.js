import React, { Component } from 'react'
import NewMovieForm from '../containers/NewMovieForm'
import NewShowForm from '../containers/NewShowForm'

class NewMediaFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldInfo: this.props.searchResult,
      type: this.props.type
    }
  }

  render() {
    let renderedJSX

    if (this.state.type === "movie") {
      renderedJSX =
        <NewMovieForm
          name={''}
          director={''}
          studio={''}
          poster={''}
          year={''}
          runtime={''}
          description={''}
          imdbRating={''}
        />
    }
    else if (this.state.type === "show") {
      renderedJSX =
        <NewShowForm
          name={''}
          writer={''}
          studio={''}
          poster={''}
          startYear={''}
          endYear={''}
          description={''}
          imdbRating={''}
        />
    }
    else {
      renderedJSX =
        <div>
          <h1>Buttons</h1>
        </div>
    }

    return(
      <div>
        {renderedJSX}
      </div>
    )
  }
}

export default NewMediaFormContainer
