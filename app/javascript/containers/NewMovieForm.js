import React, { Component } from 'react'

import TextInput from '../components/TextInput'

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
      imdbRating: '',
      userRating: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (Object.keys(this.props).length !== 0) {
      this.setState({
        name: this.props.name,
        director: this.props.director,
        studio: this.props.studio,
        year: this.props.year,
        runtime: this.props.runtime,
        description: this.props.description,
        imdbRating: this.props.imdbRating
      })
    }
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({ [fieldName]: input })
  }

  render() {
    console.log(this.state)
    return(
      <form>
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
        <TextInput
          label="Description"
          value={ this.state.description }
          name="description"
          handleChange={ this.handleChange }
        />
      </form>
    )
  }
}

export default NewMovieForm
