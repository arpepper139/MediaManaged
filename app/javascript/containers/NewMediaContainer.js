import React, { Component } from 'react'
import TextInput from '../components/TextInput'

class NewMediaContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {},
      searchError: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.validateSearch = this.validateSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({ [fieldName]: input })
  }

  validateSearch(input) {
    let regex = /.*\S.*/
    if (!(regex.test(input))) {
      this.setState({ searchError: 'You must provide a search term' })
      return false
    }
    else {
      this.setState({ searchError: '' })
      return true
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    let valid = this.validateSearch(this.state.searchValue)
    if (valid) {
      fetch(`/api/v1/search.json?name=${this.state.searchValue}`, { credentials: 'same-origin' })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => {
          return response.json()
        })
        .then(body => {
          this.setState({ databaseMatches: body.results })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
      this.handleClearSearch(event)
    }
  }

  handleClearSearch(event) {
    event.preventDefault()
    this.setState({
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {},
      searchError: ''
    })
  }

  render() {
    console.log(this.state)
    let results
    let dataMatches = this.state.databaseMatches

    if (dataMatches.length !== 0) {
      let key = 0
      results = dataMatches.map((result) => {
        key++
        return(
          <li key={key}>{result.name}</li>
        )
      })
    }

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
        <div>
          {results}
        </div>
      </div>
    )
  }
}

export default NewMediaContainer
