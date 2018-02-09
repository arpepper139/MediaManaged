import React, { Component } from 'react'

import TextInput from '../components/TextInput'
import RatingInput from '../components/RatingInput'

class NewShowForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      writer: '',
      studio: '',
      startYear: '',
      endYear: '',
      description: '',
      poster: '',
      imdbRating: '',
      userRating: '',
      userRatings: [1,2,3,4,5]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (Object.keys(this.props).length > 1) {
      this.setState({
        name: this.props.name,
        writer: this.props.writer,
        startYear: this.props.startYear,
        endYear: this.props.endYear,
        description: this.props.description,
        imdbRating: this.props.imdbRating,
        poster: this.props.poster
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
    let formPayload = {
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
    this.props.addMedia('show', formPayload)
  }

  render() {
    console.log(this.state)

    return(
      <form>
        <h1 className="form-header">Add New Show</h1>
        <TextInput
          label="Show Name"
          value={ this.state.name }
          name="name"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="Writer"
          value={ this.state.writer }
          name="writer"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="Studio"
          value={ this.state.studio }
          name="studio"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="Start Year"
          value={ this.state.startYear }
          name="startYear"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="End Year (If Applicable)"
          value={ this.state.endYear }
          name="endYear"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="IMDb Rating"
          value={ this.state.imdbRating }
          name="imdbRating"
          handleChange={ this.handleChange }
        />
        <label htmlFor="rating">Your Rating</label>
        <RatingInput
          name='rating'
          value={this.state.userRating}
          ratings={this.state.userRatings}
          handleChange={this.handleChange}
        />
        <TextInput
          label="Description"
          value={ this.state.description }
          name="description"
          handleChange={ this.handleChange }
        />
        <button className="submit" onClick={ this.handleSubmit }>Submit</button>
      </form>
    )
  }
}

export default NewShowForm
