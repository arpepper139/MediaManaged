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
    this.addMedia = this.addMedia.bind(this)
  }

  addMedia(type, formPayload) {
    fetch(`/api/v1/${type}s`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {  'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        return response.json()
      })
      .then(body => {
        this.props.passMessage(body.message)
        this.props.clearPage()
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`)
      });
  }

  selectForm(event) {
    let selectedType = event.target.value
    this.setState({ selectedType: selectedType })
  }

  render() {
    let buttons
    let renderedForm
    console.log(this.state)

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
            poster={this.state.fieldInfo.poster}
            addMedia={ this.addMedia }
          />
      }
      else {
        renderedForm =
          <NewMovieForm
            addShow={ this.addMedia }
          />
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
            poster={this.state.fieldInfo.poster}
            addMedia={ this.addMedia }
          />
      }
      else {
        renderedForm =
          <NewShowForm
            addShow={ this.addMedia }
          />
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
