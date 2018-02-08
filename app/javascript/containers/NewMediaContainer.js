import React, { Component } from 'react'
import TextInput from '../components/TextInput'

class NewMediaContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({ [fieldName]: input })
  }

  handleSubmit(event) {
    debugger
  }

  render() {

    console.log(this.state)

    return(
      <div className="new-media-page">
        <span>
          Welcome to MediaManaged's add page! In order to add a movie to your collection, please search for it below.
          If the movie already exists in our database you will be directed to select it. If we do not have the movie but can find in through Omdb,
          we will pre-populate the add form for you. Even if we can't find it for you, you can still add it yourself!
        </span>
        <form>
          <TextInput
            label={'Find Media'}
            name="searchValue"
            value={ this.state.searchValue }
            handleChange={ this.handleChange }
          />
          <button className='button' id='submit' onClick={ this.handleSubmit }>Submit</button>
        </form>
      </div>
    )
  }
}

export default NewMediaContainer
