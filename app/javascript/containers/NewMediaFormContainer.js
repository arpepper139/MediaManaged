import React, { Component } from 'react'
import NewMediaForm from '../containers/NewMediaForm'

const regex = /.*\S.*/

class NewMediaFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldInfo: this.props.searchResult,
      givenType: this.props.type,
      selectedType: null,
      errors: {}
    }

    this.selectForm = this.selectForm.bind(this)
    this.addMedia = this.addMedia.bind(this)

    this.addError = this.addError.bind(this)
    this.deleteError = this.deleteError.bind(this)

    this.validatePresence = this.validatePresence.bind(this)
    this.validateNumericality = this.validateNumericality.bind(this)
    this.validateNumberRange = this.validateNumberRange.bind(this)
    this.validateYear = this.validateYear.bind(this)
    this.validateDescription = this.validateDescription.bind(this)

    this.validateShow = this.validateShow.bind(this)
    this.validateMovie = this.validateMovie.bind(this)
  }

  selectForm(event) {
    let selectedType = event.target.value
    this.setState({
      selectedType: selectedType,
      errors: {}
    })
  }

  capitalize(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  formatFieldName(fieldName) {
    return fieldName.replace(/_/, " ")
  }

  addError(fieldName) {
    let newError = { [fieldName]: `You must provide a valid ${this.formatFieldName(fieldName)}` }
    this.setState({ errors: Object.assign(this.state.errors, newError) })
    return false
  }

  deleteError(fieldName) {
    let errorState = this.state.errors
    delete errorState[fieldName]
    this.setState({ errors: errorState })
    return true
  }

  validateNumericality(value) {
    return typeof +value === 'number'
  }

  validatePresence(fieldName, value) {
    if (!(regex.test(value))) {
      return this.addError(fieldName)
    }
    else {
      return this.deleteError(fieldName)
    }
  }

  validateNumberRange(fieldName, value, start, end) {
    if (!(regex.test(value))) {
      return this.deleteError(fieldName)
    }
    else if (!(this.validateNumericality(+value)) || +value < start || +value > end) {
      return this.addError(fieldName)
    }
    else {
      return this.deleteError(fieldName)
    }
  }

  validateDescription(fieldName, value) {
    if (value.trim().length > 5000) {
      return this.addError(fieldName)
    }
    else {
      return this.deleteError(fieldName)
    }
  }

  validateYear(fieldName, value) {
    if (fieldName == "end_year" && !(regex.test(value))) {
      return this.deleteError(fieldName)
    }
    else if (value.trim().length !== 4 || !(this.validateNumericality(value))) {
      return this.addError(fieldName)
    }
    else {
      return this.deleteError(fieldName)
    }
  }

  validateMovie(formPayload) {
    if (
      this.validatePresence('name', formPayload.movie.name) &&
      this.validatePresence('director', formPayload.movie.director) &&
      this.validateYear('year', formPayload.movie.year) &&
      this.validateDescription('description', formPayload.movie.description) &&
      this.validateNumberRange('imdb_rating', formPayload.movie.imdb_rating, 0, 10) &&
      this.validateNumberRange('user_rating', formPayload.user_rating, 1, 5)
    ) {
      return true
    }
    else { return false }
  }

  validateShow(formPayload) {
    if (
      this.validatePresence('name', formPayload.show.name) &&
      this.validatePresence('writer', formPayload.show.writer) &&
      this.validateYear('start_year', formPayload.show.start_year) &&
      this.validateYear('end_year', formPayload.show.end_year) &&
      this.validateDescription('description', formPayload.show.description) &&
      this.validateNumberRange('imdb_rating', formPayload.show.imdb_rating, 0, 10) &&
      this.validateNumberRange('user_rating', formPayload.user_rating, 1, 5)
    ) {
      return true
    }
    else { return false }
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
          debugger
          this.setState({ errors: { saveError: errorBody.error } })
          this.props.passMessage('')
        }
      })
  }

  render() {
    let buttons,
    formHeader,
    formType,
    validator,
    returnedForm,
    formClass,
    errorListItems,
    errorDiv,
    icon

    if (this.state.givenType) {
      formHeader = "Add New " + this.capitalize(this.state.givenType)
      formType = this.state.givenType
    }
    else if (this.state.selectedType) {
      formHeader = "Add New " + this.capitalize(this.state.selectedType)
      formType = this.state.selectedType
    }
    else {
      formHeader = ''
      formType = null
    }

    if(Object.keys(this.state.errors).length > 0) {
      errorListItems = Object.values(this.state.errors).map((error) => {
        return <li key={error}>{error}</li>
      })
      errorDiv =
        <div className="errors">
          <h2>The following errors prevented save:</h2>
          <ul>
            { errorListItems }
          </ul>
        </div>
    }

    if (formType === "movie") {
      validator = this.validateMovie
      icon = <i className="fas fa-ticket-alt"></i>
    }
    else if (formType == "show") {
      validator = this.validateShow
      icon = <i className="fas fa-video"></i>
    }

    if (this.state.givenType === null) {
      buttons =
        <div className="select-buttons">
          <button className='form-select-button' value="movie" onClick={ this.selectForm }>Add Movie</button>
          <button className='form-select-button' value="show" onClick={ this.selectForm }>Add Show</button>
        </div>
    }

    if (formType !== null) {
      returnedForm =
        <NewMediaForm
          fieldInfo={this.state.fieldInfo}
          addMedia={ this.addMedia }
          validate={ validator }
          errors={ this.state.errors }
          formType={ formType }
        />

      formClass="new-media-form"
    }

    return(
      <div>
        {buttons}
        <div className={formClass}>
          <h1 className="form-header">{icon} {formHeader}</h1>
          {errorDiv}
          {returnedForm}
        </div>
      </div>
    )
  }
}

export default NewMediaFormContainer
