import React, { Component } from 'react'
import NewMovieForm from '../containers/NewMovieForm'
import NewShowForm from '../containers/NewShowForm'

class NewMediaFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldInfo: this.props.searchResult,
      givenType: this.props.type,
      selectedType: null
    }

    this.selectForm = this.selectForm.bind(this)
  }

  selectForm(event) {
    let selectedType = event.target.value
    this.setState({ selectedType: selectedType })
  }

  render() {
    let buttons
    let renderedForm

    if (this.state.givenType === "movie" || this.state.selectedType === "movie") {
      renderedForm =
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
    else if (this.state.givenType === "show" || this.state.selectedType === "show") {
      renderedForm =
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

    if (this.state.givenType === null) {
      buttons =
        <div className="select-buttons">
          <button className='form-select-button' value="movie" onClick={ this.selectForm }>Add Movie</button>
          <button className='form-select-button' value="show" onClick={ this.selectForm }>Add Show</button>
        </div>
    }

    return(
      <div>
        {buttons}
        {renderedForm}
      </div>
    )
  }
}

export default NewMediaFormContainer
