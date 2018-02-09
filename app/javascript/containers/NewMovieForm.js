import React, { Component } from 'react'

import TextInput from '../components/TextInput'
import RatingInput from '../components/RatingInput'

class NewMovieForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      director: '',
      studio: '',
      year: '',
      runtime: '',
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
        director: this.props.director,
        studio: this.props.studio,
        year: this.props.year,
        runtime: this.props.runtime,
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
    this.props.addMedia('movie', formPayload)
  }

  render() {
    console.log(this.state)

    return(
      <form>
        <h1 className="form-header">Add New Movie</h1>
        <TextInput
          label="Movie Name"
          value={ this.state.name }
          name="name"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="Director"
          value={ this.state.director }
          name="director"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="Studio"
          value={ this.state.studio }
          name="studio"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="Year"
          value={ this.state.year }
          name="year"
          handleChange={ this.handleChange }
        />
        <TextInput
          label="Runtime"
          value={ this.state.runtime }
          name="runtime"
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

export default NewMovieForm
