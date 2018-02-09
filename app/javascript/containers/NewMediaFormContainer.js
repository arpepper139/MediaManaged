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

    // console.log(this.props)

    if (this.state.givenType === "movie" || this.state.selectedType === "movie") {
      if (this.state.fieldInfo !== null) {
        renderedForm =
          <NewMovieForm
            name={this.state.fieldInfo.name}
            director={this.state.fieldInfo.director}
            studio={this.state.fieldInfo.studio}
            year={this.state.fieldInfo.year}
            runtime={this.state.fieldInfo.runtime}
            description={this.state.fieldInfo.description}
            imdbRating={this.state.fieldInfo.imdb_rating}
          />
      }
      else {
        renderedForm = <NewMovieForm />
      }
    }
    else if (this.state.givenType === "show" || this.state.selectedType === "show") {
      if (this.state.fieldInfo !== null) {
        renderedForm =
          <NewShowForm
            name={this.state.fieldInfo.name}
            writer={this.state.fieldInfo.writer}
            startYear={this.state.fieldInfo.start_year}
            endYear={this.state.fieldInfo.end_year}
            description={this.state.fieldInfo.description}
            imdbRating={this.state.fieldInfo.imdb_rating}
          />
      }
      else {
        renderedForm = <NewShowForm />
      }
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
