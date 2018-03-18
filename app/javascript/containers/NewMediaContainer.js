import React, { Component } from 'react'
import TextInput from '../components/TextInput'
import NewOwnershipForm from '../containers/NewOwnershipForm'
import AlreadyInDB from '../components/AlreadyInDB'
import OMDBAddForm from '../containers/OMDBAddForm'
import NewMediaFormContainer from '../containers/NewMediaFormContainer'
import FlashNotice from '../components/FlashNotice'
import SearchPrompt from '../components/SearchPrompt'

const presenceRegex = /.*\S.*/

class NewMediaContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      searchValue: '',
      databaseMatches: [],
      omdbMatch: {},
      searchedDatabase: false,
      searchedOMDB: false,
      inDatabase: false
    }

    this.clearFlash = this.clearFlash.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.databaseQuery = this.databaseQuery.bind(this)
    this.omdbQuery = this.omdbQuery.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)
    this.preventSubmit = this.preventSubmit.bind(this)
    this.grabMessage = this.grabMessage.bind(this)
  }

  clearFlash() {
    this.setState({ message: '' })
  }

  handleChange(event) {
    const fieldName = event.target.name
    const input = event.target.value
    this.setState({
      [fieldName]: input,
      message: ''
    })
    this.databaseQuery(input)
  }

  databaseQuery(input) {
    event.preventDefault()
    const valid = presenceRegex.test(input)
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
    const input = this.state.searchValue
    const valid = presenceRegex.test(input)
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
        let setSearch = ''
        if (body.inDatabase === true) {
          setSearch = this.state.searchValue
        }
        this.setState({
          omdbMatch: { result: body.found_media, type: body.type },
          inDatabase: body.in_database,
          searchValue: setSearch,
          searchedOMDB: true
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  preventSubmit(event) {
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

  renderFlash() {
    if (this.state.message !== '') {
      return(
        <FlashNotice
          message={this.state.message}
          clearFlash={this.clearFlash}
        />
      )
    }
  }

  renderDatabaseResults() {
    const dbMatches = this.state.databaseMatches
    const searchValuePresent = presenceRegex.test(this.state.searchValue)
    let databaseResults
    if (dbMatches.length !== 0 && searchValuePresent) {
      let key = 0
      databaseResults = dbMatches.map((media) => {
        const type = `${media.director ? "movie" : "show"}`
        key++

        return(
          <NewOwnershipForm
            key={key}
            id={media.id}
            name={media.name}
            type={type}
            clearPage={this.handleClearSearch}
            passMessage={this.grabMessage}
          />
        )
      })
    }

    return databaseResults
  }

  renderOMDBResultOrAddForm() {
    const omdbMatch = this.state.omdbMatch.result
    if (omdbMatch !== null) {
      return(
        <OMDBAddForm
          searchResult={this.state.omdbMatch.result}
          type={this.state.omdbMatch.type}
          clearPage={this.handleClearSearch}
          passMessage={this.grabMessage}
        />
      )
    }
    else {
      return(
        <NewMediaFormContainer
          clearPage={this.handleClearSearch}
          passMessage={this.grabMessage}
        />
      )
    }
  }

  renderNonDatabasePath() {
    const dbMatches = this.state.databaseMatches
    const searchValuePresent = presenceRegex.test(this.state.searchValue)
    const searchedDatabase = this.state.searchedDatabase
    const searchedOMDB = this.state.searchedOMDB
    const inDatabase = this.state.inDatabase

    if (searchedOMDB && inDatabase) {
      return(
        <AlreadyInDB
          title={this.state.omdbMatch.result}
        />
      )
    }
    else if (searchValuePresent && searchedDatabase) {
      return <SearchPrompt omdbQuery={this.omdbQuery} />
    }
    else if (searchedOMDB && !inDatabase) {
      const addMediaComponent = this.renderOMDBResultOrAddForm()
      return addMediaComponent
    }
  }

  render() {
    return(
      <div>
        {this.renderFlash()}
        <div className="new-media-page">
          <h1 className="new-media-greeting">Add movies and shows to your personal collection below!</h1>
          <form autoComplete="off" onSubmit={this.preventSubmit}>
            <TextInput
              placeholder="Search Our Collection"
              name="searchValue"
              value={ this.state.searchValue }
              handleChange={ this.handleChange }
            />
          </form>
          <div className="search-results">
            {this.renderDatabaseResults()}
          </div>
          {this.renderNonDatabasePath()}
        </div>
      </div>
    )
  }
}

export default NewMediaContainer
