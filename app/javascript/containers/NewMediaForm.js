import React, { Component } from 'react'

import Dropzone from 'react-dropzone'
import TextInput from '../components/TextInput'
import RatingInput from '../components/RatingInput'
import GenreSelect from '../components/GenreSelect'
import TextArea from '../components/TextArea'

import NewMovieFields from '../constants/NewMovieFields'
import NewShowFields from '../constants/NewShowFields'

class NewMediaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      studio: '',
      genres: [],

      writer: '',
      startYear: '',
      endYear: '',

      director: '',
      year: '',
      runtime: '',

      description: '',
      imdbRating: '',
      userRating: '',

      poster: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStarSelection = this.handleStarSelection.bind(this)
    this.handleGenreSelection = this.handleGenreSelection.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.readFile = this.readFile.bind(this)
    this.formatForValidation = this.formatForValidation.bind(this)
    this.createFormPayload = this.createFormPayload.bind(this)
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({ [fieldName]: input })
  }

  handleStarSelection(rating) {
    this.setState({ userRating: rating })
  }

  handleGenreSelection(genre) {
    let currentSelectedGenres = this.state.genres
    let nextSelectedGenres
    if (currentSelectedGenres.includes(genre)) {
      nextSelectedGenres = currentSelectedGenres.filter(currentGenre => {
        return currentGenre !== genre
      })
    }
    else {
      nextSelectedGenres = currentSelectedGenres.concat(genre)
    }
    this.setState({ genres: nextSelectedGenres })
  }

  readFile(selectorFiles: FileList) {
    if (selectorFiles && selectorFiles[0]) {
      this.setState({ poster: selectorFiles[0] })
    }
  }

  formatForValidation(type) {
    let formattedFields = {};
    formattedFields.name = this.state.name
    formattedFields.description = this.state.description
    formattedFields.imdb_rating = this.state.imdbRating
    formattedFields.user_rating = this.state.userRating

    if (type === 'show') {
      formattedFields.writer = this.state.writer
      formattedFields.start_year = this.state.startYear
      formattedFields.end_year = this.state.endYear
    }
    else {
      formattedFields.director = this.state.director
      formattedFields.year = this.state.year
    }

    return formattedFields
  }

  createFormPayload(type) {
    let formPayload = new FormData();

    formPayload.append('name', this.state.name)
    formPayload.append('studio', this.state.studio)
    formPayload.append('description', this.state.description)
    formPayload.append('poster', this.state.poster)
    formPayload.append('imdb_rating', this.state.imdbRating)
    formPayload.append('user_rating', this.state.userRating)
    formPayload.append('genres', this.state.genres)

    if (type == 'show') {
      formPayload.append('writer', this.state.writer)
      formPayload.append('start_year', this.state.startYear)
      formPayload.append('end_year', this.state.endYear)
    }
    else {
      formPayload.append('director', this.state.director)
      formPayload.append('year', this.state.year)
      formPayload.append('runtime', this.state.runtime)
    }
    return formPayload
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload, validatableFields, valid
    if (this.props.formType === 'show') {
      validatableFields = this.formatForValidation('show')
      valid = this.props.validate(validatableFields)
      if (valid) {
        formPayload = this.createFormPayload('show')
        this.props.addMedia(this.props.formType, formPayload)
      }
    }
    else {
      validatableFields = this.formatForValidation('movie')
      valid = this.props.validate(validatableFields)
      if (valid) {
        formPayload = this.createFormPayload('movie')
        this.props.addMedia(this.props.formType, formPayload)
      }
    }
  }

  render() {
    let formFields;
    if (this.props.formType === "show") {
      formFields = NewShowFields
    }
    else if (this.props.formType === "movie") {
      formFields = NewMovieFields
    }

    let actionText = `${this.state.poster === '' ? "Add a poster!" : "Uploaded!"}`

    let inputFieldComponents = formFields.map((field) => {
      return(
        <TextInput
          key={ field.id }
          label={ field.label }
          value={ this.state[field.name] }
          name={ field.name }
          handleChange={ this.handleChange }
        />
      )
    })

    let exclamationClass = "fas fa-exclamation hidden"
    if (Object.keys(this.props.errors).length !== 0) {
     exclamationClass = "fas fa-exclamation"
    }

    return(
      <form>
        {inputFieldComponents.slice(0, 2)}
        <GenreSelect
          genres={ this.state.genres }
          handleChange={ this.handleGenreSelection }
        />
        {inputFieldComponents.slice(2, 5)}
        <div className="new-media-rating">
          <label>Your Rating</label>
          <RatingInput
            name='userRating'
            value={ this.state.userRating }
            handleClick={ this.handleStarSelection }
          />
        </div>
        {inputFieldComponents.slice(5)}
        <div className="new-media-drop">
          <label>Poster</label>
          <Dropzone
            multiple={false}
            onDrop={this.readFile}
            accept="image/jpeg, image/jpg, image/png"
          >
            <p>{actionText}</p>
          </Dropzone>
        </div>
        <TextArea
          label="Description"
          value={ this.state.description }
          name="description"
          handleChange={ this.handleChange }
        />
        <button className="submit" onClick={ this.handleSubmit }>Submit</button>
        <i className={exclamationClass}></i>
      </form>
    )
  }
}

export default NewMediaForm
