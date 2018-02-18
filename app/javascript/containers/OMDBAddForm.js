import React, { Component } from 'react'

import RatingInput from '../components/RatingInput'
import FoundMediaInfoCallout from '../components/FoundMediaInfoCallout'

class OMDBAddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: '',
      errors: {},
      callout: false
    }

    this.capitalize = this.capitalize.bind(this)
    this.handleStarSelection = this.handleStarSelection.bind(this)
    this.createFormPayload = this.createFormPayload.bind(this)
    this.addMedia = this.addMedia.bind(this)
    this.toggleCallout = this.toggleCallout.bind(this)
  }

  capitalize(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  handleStarSelection(rating) {
    this.setState({ rating })
  }

  toggleCallout(event) {
    event.preventDefault()
    let currentCalloutState = this.state.callout
    if (currentCalloutState == true) {
      this.setState({ callout: false })
    }
    else {
      this.setState({ callout: true })
    }
  }

  createFormPayload(type) {
    let formPayload
    if (type === "movie") {
      formPayload = {
        movie: {
          name: this.props.searchResult.name,
          director: this.props.searchResult.director,
          studio: this.props.searchResult.studio,
          year: this.props.searchResult.year,
          runtime: this.props.searchResult.runtime,
          description: this.props.searchResult.description,
          poster: this.props.searchResult.poster,
          imdb_rating: this.props.searchResult.imdb_rating
        },
        user_rating: this.state.rating,
        genres: this.props.searchResult.genres
      }
      return formPayload
    }
    else {
      formPayload = {
        show: {
          name: this.props.searchResult.name,
          writer: this.props.searchResult.writer,
          studio: this.props.searchResult.studio,
          start_year: this.props.searchResult.start_year,
          end_year: this.props.searchResult.end_year,
          description: this.props.searchResult.description,
          poster: this.props.searchResult.poster,
          imdb_rating: this.props.searchResult.imdb_rating
        },
        user_rating: this.state.rating,
        genres: this.props.searchResult.genres
      }
      return formPayload
    }
  }

  addMedia(event) {
    event.preventDefault()
    let type = this.props.type
    let formPayload = this.createFormPayload(type)
    fetch(`/api/v1/${type}s`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {  'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error, response);
        }
      })
      .then(response => {
        return response.json()
      })
      .then(body => {
        this.props.passMessage(body.message)
        this.props.clearPage()
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`)
        return error.json()
      })
      .then((errorBody) => {
        if (errorBody !== undefined) {
          this.setState({ errors: { saveError: errorBody.error } })
          this.props.passMessage('')
        }
      })
  }

  render() {
    let type = this.capitalize(this.props.type)

    let calloutClass = `${this.state.callout == false ? 'hidden' : 'info-callout'}`
    let calloutBackgroundClass = `${this.state.callout == false ? 'hidden' : 'info-background'}`

    let errorMessage
    let errors = this.state.errors
    if(Object.keys(errors).length > 0) {
      let error = Object.values(errors)[0]
      errorMessage = <p className="submit-error">{error}</p>
    }

    return(
      <div className="omdb-add-form">
        {errorMessage}
        <p className="message">{type} Found!</p>
        <form className="add-ownership">
          <div>
            <p className="media-title">{this.props.searchResult.name}</p>
          </div>
          <div className="found-media-options">
            <RatingInput
              name='rating'
              value={this.state.rating}
              handleClick={this.handleStarSelection}
            />
            <div>
              <button className="info-button" onClick={this.toggleCallout}>Info</button>
              <button className='submit-ownership' onClick={this.addMedia}>Add</button>
            </div>
          </div>
        </form>
        <div className={calloutBackgroundClass}>
        </div>
        <div className={calloutClass}>
          <FoundMediaInfoCallout
            foundInfo={this.props.searchResult}
            closeDisplay={this.toggleCallout}
          />
        </div>
      </div>
    )
  }
}

export default OMDBAddForm
