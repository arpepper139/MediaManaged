import React, { Component } from 'react'
import TextInput from '../components/TextInput'

const regex = /.*\S.*/

class NewMediaContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {},
      searched: false,
      searchError: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.validateSearch = this.validateSearch.bind(this)
    this.databaseQuery = this.databaseQuery.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({ [fieldName]: input })
    this.databaseQuery(input)
  }

  validateSearch(input) {
    if (!(regex.test(input))) {
      this.setState({ searchError: 'Please provide a search term' })
      return false
    }
    else {
      this.setState({ searchError: '' })
      return true
    }
  }

  databaseQuery(input) {
    event.preventDefault()
    let valid = this.validateSearch(input)
    if (valid) {
      fetch(`/api/v1/search.json?name=${input}`, { credentials: 'same-origin' })
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
          this.setState({
            databaseMatches: body.results,
            searched: true
          })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
  }

  handleClearSearch(event) {
    event.preventDefault()
    this.setState({
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {},
      searched: false,
      searchError: ''
    })
  }

  render() {
    console.log(this.state)
    let results
    let dataMatches = this.state.databaseMatches
    let searchValue = this.state.searchValue
    let searched = this.state.searched
    let omdbButton;

    if (dataMatches.length !== 0 && regex.test(searchValue)) {
      let key = 0
      results = dataMatches.map((result) => {
        key++
        return(
          <li key={key}>{result.name}</li>
        )
      })

      results.push(<li key={"search"}>No Match? Click here to search Omdb!</li>)
    }
    else if (dataMatches.length === 0 && regex.test(searchValue) && searched === true) {
      omdbButton = <button className='search-button' onClick={ this.handleSubmit }>Search Omdb</button>
    }

    return(
      <div>
        <div className="new-media-page">
          <p className="intro">
            Welcome to MediaManaged's add page! To add a movie to your collection, please search for it below.
            If the movie already exists in our database you can click "select" to add it. If we don't have the movie stored,
            but can find it through Omdb, we'll pre-populate a form for you. Even if we can't find it for you on Omdb,
            you can still add it yourself!
          </p>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              label={'Find Media'}
              name="searchValue"
              value={ this.state.searchValue }
              handleChange={ this.handleChange }
            />
          </form>
          <p>{this.state.searchError}</p>
          {omdbButton}
          <div>
            {results}
          </div>
        </div>
      </div>
    )
  }
}

export default NewMediaContainer
