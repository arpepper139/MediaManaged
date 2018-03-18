import React, { Component } from 'react'

import NewMediaFormWrapper from '../components/NewMediaFormWrapper'
import NewMediaForm from '../containers/NewMediaForm'
import SelectFormType from '../components/SelectFormType'

const presenceRegex = /.*\S.*/
const numberRegex = /^\d+\.*\d{1}$/

class NewMediaFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

    this.validateMedia = this.validateMedia.bind(this)
  }

  selectForm(event) {
    event.preventDefault()
    const selectedType = event.target.value
    this.setState({
      selectedType: selectedType,
      errors: {}
    })
  }

  formatFieldName(fieldName) {
    return fieldName.replace(/_/, " ")
  }

  addError(fieldName) {
    const newError = { [fieldName]: `You must provide a valid ${this.formatFieldName(fieldName)}` }
    this.setState({ errors: Object.assign(this.state.errors, newError) })
    return false
  }

  deleteError(fieldName) {
    const errorState = this.state.errors
    delete errorState[fieldName]
    this.setState({ errors: errorState })
    return true
  }

  validateNumericality(value) {
    return numberRegex.test(value)
  }

  validatePresence(fieldName, value) {
    if (!(presenceRegex.test(value))) {
      return this.addError(fieldName)
    }
    else {
      return this.deleteError(fieldName)
    }
  }

  validateNumberRange(fieldName, value, start, end) {
    if (!(presenceRegex.test(value))) {
      return this.deleteError(fieldName)
    }
    else if (!(this.validateNumericality(value)) || +value < start || +value > end) {
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
    if (fieldName === 'end_year' && !(presenceRegex.test(value))) {
      return this.deleteError(fieldName)
    }
    else if (value.trim().length !== 4 || !(this.validateNumericality(value))) {
      return this.addError(fieldName)
    }
    else {
      return this.deleteError(fieldName)
    }
  }

  validateMedia(type, fields) {
    this.deleteError('saveError')

    const validationResults = []
    validationResults.push(this.validatePresence('name', fields.name))
    if (type === 'movie') {
      validationResults.push(this.validatePresence('director', fields.director))
      validationResults.push(this.validateYear('year', fields.year))
    }
    else {
      validationResults.push(this.validatePresence('writer', fields.writer))
      validationResults.push(this.validateYear('start_year', fields.start_year))
      validationResults.push(this.validateYear('end_year', fields.end_year))
    }
    validationResults.push(this.validateDescription('description', fields.description))
    validationResults.push(this.validateNumberRange('imdb_rating', fields.imdb_rating, 0, 10))
    validationResults.push(this.validateNumberRange('user_rating', fields.user_rating, 1, 5))

    return !validationResults.includes(false)
  }

  addMedia(type, formPayload) {
    fetch(`/api/v1/${type}s`, {
      credentials: 'same-origin',
      method: 'POST',
      body: formPayload,
      headers: { 'Accept': 'application/json' }
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
          this.setState({ errors: { saveError: errorBody.error } })
          this.props.passMessage('')
        }
      })
  }

  renderErrorMessage() {
    const errors = this.state.errors
    if(Object.keys(errors).length > 0) {
      return <h2 className="submit-error">{Object.values(errors)[0]}</h2>
    }
  }

  renderNewMediaForm() {
    const selectedType = this.state.selectedType
    if (selectedType !== null) {
      return(
        <NewMediaFormWrapper type={selectedType}>
          {this.renderErrorMessage()}
          <NewMediaForm
            addMedia={ this.addMedia }
            validate={ this.validateMedia }
            errors={ this.state.errors }
            formType={ this.state.selectedType }
          />
        </NewMediaFormWrapper>
      )
    }
  }

  render() {
    return(
      <div>
        <SelectFormType
          selectForm={this.selectForm}
        />
        {this.renderNewMediaForm()}
      </div>
    )
  }
}

export default NewMediaFormContainer
