import React, { Component } from 'react'

import TextInput from '../components/TextInput'

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
      imdbRating: '',
      userRating: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (Object.keys(this.props).length !== 0) {
      this.setState({
        name: this.props.name,
        writer: this.props.writer,
        startYear: this.props.startYear,
        endYear: this.props.endYear,
        description: this.props.description,
        imdbRating: this.props.imdbRating
      })
    }

    //Note --> conditionally render my Dropzone depending on if props have been passed
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

export default NewShowForm
