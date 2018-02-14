import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import NewOwnershipForm from '../containers/NewOwnershipForm'
import NewMediaFormContainer from '../containers/NewMediaFormContainer'
import FlashNotice from '../components/FlashNotice'

const regex = /.*\S.*/

class NewMediaContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {},
      searchedDatabase: false,
      searchedOMDB: false
    }

    this.clearFlash = this.clearFlash.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateSearch = this.validateSearch.bind(this)
    this.databaseQuery = this.databaseQuery.bind(this)
    this.omdbQuery = this.omdbQuery.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.grabMessage = this.grabMessage.bind(this)
  }

  clearFlash() {
    this.setState({ message: '' })
  }

  handleChange(event) {
    let fieldName = event.target.name
    let input = event.target.value
    this.setState({
      [fieldName]: input,
      message: ''
    })
    this.databaseQuery(input)
  }

  validateSearch(input) {
    if (!(regex.test(input))) {
      return false
    }
    else {
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
          searchedDatabase: true,
          searchedOMDB: false
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  omdbQuery(event) {
    event.preventDefault()
    let input = this.state.searchValue
    let valid = this.validateSearch(input)
    if (valid) {
      fetch(`/api/v1/search/external.json?name=${input}`, { credentials: 'same-origin' })
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
        let foundMedia
        let type

        if (body.movie) {
          foundMedia = body.movie
          type = "movie"
        }
        else if (body.show) {
          foundMedia = body.show
          type = "show"
        }
        else {
          foundMedia = null
          type = null
        }

        this.setState({
          omdbMatch: { result: foundMedia, type: type},
          message: body.message,
          searchValue: '',
          searchedOMDB: true
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
  }

  handleClearSearch() {
    this.setState({
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {},
      searchedDatabase: false,
      searchedOMDB: false,
    })
  }

  grabMessage(message) {
    this.setState({ message: message })
  }

  render() {
    let dataMatches = this.state.databaseMatches
    let searchValue = this.state.searchValue
    let searchedDatabase = this.state.searchedDatabase
    let searchedOMDB = this.state.searchedOMDB

    let results
    let omdbButton
    let addMediaForm
    let flash

    if (this.state.message !== '') {
      flash =
        <FlashNotice
          message={this.state.message}
          clearFlash={this.clearFlash}
        />
    }

    if (dataMatches.length !== 0 && regex.test(searchValue)) {
      let key = 0
      results = dataMatches.map((result) => {
        let type = `${result.director ? "movie" : "show"}`
        key++

        return(
          <NewOwnershipForm
            key={key}
            id={result.id}
            name={result.name}
            type={type}
            clearPage={this.handleClearSearch}
            passMessage={this.grabMessage}
          />
        )
      })

      omdbButton = <button className='search-button' onClick={ this.omdbQuery }>Search OMDb</button>
    }
    else if (dataMatches.length === 0 && regex.test(searchValue) && searchedDatabase === true) {
      omdbButton = <button className='search-button' onClick={ this.omdbQuery }>Search OMDb</button>
    }
    else if (searchedOMDB === true) {
      addMediaForm =
        <NewMediaFormContainer
          searchResult={this.state.omdbMatch.result}
          type={this.state.omdbMatch.type}
          clearPage={this.handleClearSearch}
          passMessage={this.grabMessage}
        />
    }

    return(
      <div>
        {flash}
        <div className="new-media-page">
          <h1 className="new-media-greeting">Add movies and shows to your personal collection below!</h1>
          <form autoComplete="off" onSubmit={this.handleFormSubmit}>
            <TextInput
              placeholder="Search Our Collection"
              name="searchValue"
              value={ this.state.searchValue }
              handleChange={ this.handleChange }
            />
          </form>
          <div className="search-results">
            {results}
          </div>
          {omdbButton}
          {addMediaForm}
        </div>
      </div>
    )
  }
}

export default NewMediaContainer
