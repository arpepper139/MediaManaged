import React, { Component } from 'react'
import NewMediaForm from '../containers/NewMediaForm'

class NewMediaFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldInfo: this.props.searchResult,
      givenType: this.props.type,
      selectedType: null,
      saveError: ''
    }

    this.selectForm = this.selectForm.bind(this)
    this.addMedia = this.addMedia.bind(this)

    // this.validatePresence = this.validatePresence.bind(this)
    // this.validateNumericality = this.validateNumericality.bind(this)
    // this.validateLength = this.validateLength.bind(this)
    // this.validateUniqueness = this.validateUniqueness.bind(this)
  }

  capitalize(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  selectForm(event) {
    let selectedType = event.target.value
    this.setState({ selectedType: selectedType })
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
          throw(error, response);
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
        return error.json()
      })
      .then((errorBody) => {
        if (errorBody !== undefined) {
          this.setState({ saveError: errorBody.error })
          this.props.passMessage('')
        }
      })
  }

  render() {
    let buttons
    let renderedForm

    let formType
    if (this.state.givenType) {
      formType = "Add New " + this.capitalize(this.state.givenType)
    }
    else if (this.state.selectedType) {
      formType = "Add New " + this.capitalize(this.state.selectedType)
    }

    if (this.state.givenType === "movie" || this.state.selectedType === "movie") {
      if (this.state.fieldInfo !== null) {
        renderedForm =
          <NewMediaForm
            name={this.state.fieldInfo.name}
            director={this.state.fieldInfo.director}
            studio={this.state.fieldInfo.studio}
            year={this.state.fieldInfo.year}
            runtime={this.state.fieldInfo.runtime}
            description={this.state.fieldInfo.description}
            imdbRating={this.state.fieldInfo.imdb_rating}
            poster={this.state.fieldInfo.poster}
            addMedia={ this.addMedia }
            formType="movie"
          />
      }
      else {
        renderedForm =
          <NewMediaForm
            addShow={ this.addMedia }
            formType="movie"
          />
      }
    }
    else if (this.state.givenType === "show" || this.state.selectedType === "show") {
      if (this.state.fieldInfo !== null) {
        renderedForm =
          <NewMediaForm
            name={this.state.fieldInfo.name}
            writer={this.state.fieldInfo.writer}
            startYear={this.state.fieldInfo.start_year}
            endYear={this.state.fieldInfo.end_year}
            description={this.state.fieldInfo.description}
            imdbRating={this.state.fieldInfo.imdb_rating}
            poster={this.state.fieldInfo.poster}
            addMedia={ this.addMedia }
            formType="show"
          />
      }
      else {
        renderedForm =
          <NewMediaForm
            addShow={ this.addMedia }
            formType="show"
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
        <div>
          <h1 className="form-header">{formType}</h1>
          <p>{this.state.saveError}</p>
          {renderedForm}
        </div>
      </div>
    )
  }
}

export default NewMediaFormContainer
