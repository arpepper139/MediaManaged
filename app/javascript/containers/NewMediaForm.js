import React, { Component } from 'react'

import TextInput from '../components/TextInput'
import RatingInput from '../components/RatingInput'

import NewMovieFields from '../constants/NewMovieFields'
import NewShowFields from '../constants/NewShowFields'

class NewMediaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      studio: '',

      writer: '',
      startYear: '',
      endYear: '',

      director: '',
      year: '',
      runtime: '',

      description: '',
      poster: '',
      imdbRating: '',
      userRating: '',
      userRatings: [1,2,3,4,5],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.formType === "show") {
      let endYear
      if (this.props.fieldInfo.end_year === null) {
        endYear = ''
      }
      else {
        endYear = this.props.fieldInfo.end_year
      }

      if (this.props.fieldInfo !== null) {
        this.setState({
          name: this.props.fieldInfo.name,
          writer: this.props.fieldInfo.writer,
          startYear: this.props.fieldInfo.start_year,
          endYear: endYear,
          description: this.props.fieldInfo.description,
          imdbRating: this.props.fieldInfo.imdb_rating,
          poster: this.props.fieldInfo.poster
        })
      }
    }
    else if (this.props.fieldInfo !== null && this.props.formType === "movie") {
      this.setState({
        name: this.props.fieldInfo.name,
        director: this.props.fieldInfo.director,
        studio: this.props.fieldInfo.studio,
        year: this.props.fieldInfo.year,
        runtime: this.props.fieldInfo.runtime,
        description: this.props.fieldInfo.description,
        imdbRating: this.props.fieldInfo.imdb_rating,
        poster: this.props.fieldInfo.poster
      })
    }

    //Note --> set boolean here to conditionally render my Dropzone depending on if props have been passed
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({ [fieldName]: input })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload
    if (this.props.formType == "show") {
      formPayload = {
        show: {
          name: this.state.name,
          writer: this.state.writer,
          studio: this.state.studio,
          start_year: this.state.startYear,
          end_year: this.state.endYear,
          description: this.state.description,
          poster: this.state.poster,
          imdb_rating: this.state.imdbRating
        },
        user_rating: this.state.userRating
      }
    }
    else {
      formPayload = {
        movie: {
          name: this.state.name,
          director: this.state.director,
          studio: this.state.studio,
          year: this.state.year,
          runtime: this.state.runtime,
          description: this.state.description,
          poster: this.state.poster,
          imdb_rating: this.state.imdbRating
        },
        user_rating: this.state.user_rating
      }
    }
    let valid = this.props.validate(formPayload)
    if (valid) {
      this.props.addMedia(this.props.formType, formPayload)
    }
  }

  render() {
    console.log(this.state)
    let formTypeFields;
    if (this.props.formType === "show") {
      formTypeFields = NewShowFields
    }
    else if (this.props.formType === "movie") {
      formTypeFields = NewMovieFields
    }

    let inputFieldComponents = formTypeFields.map((field) => {
      if (field.type === "text") {
        return(
          <TextInput
            key={ field.id }
            label={ field.label }
            value={ this.state[field.name] }
            name={ field.name }
            handleChange={ this.handleChange }
          />
        )
      }
      else if (field.type === "radio") {
        return(
          <RatingInput
            key={ field.id }
            label={ field.label }
            name={ field.name }
            value={ this.state[field.name] }
            ratings={this.state.userRatings}
            handleChange={ this.handleChange }
          />
        )
      }
    })

    let exclamationClass = "fas fa-exclamation hidden"
    if (Object.keys(this.props.errors).length !== 0) {
     exclamationClass = "fas fa-exclamation"
    }

    return(
      <form>
        {inputFieldComponents}
        <button className="submit" onClick={ this.handleSubmit }>Submit</button>
        <i className={exclamationClass}></i>
      </form>
    )
  }
}

export default NewMediaForm
