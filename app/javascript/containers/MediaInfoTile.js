import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import FlashNotice from '../components/FlashNotice.js'
import RatingInput from '../components/RatingInput.js'
import ToggleOwnershipButton from '../components/ToggleOwnershipButton.js'
import PosterUploader from '../components/PosterUploader.js'

class MediaInfoTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: ''
    }

    this.updateUserRating = this.updateUserRating.bind(this)
    this.removeMedia = this.removeMedia.bind(this)
    this.addMedia = this.addMedia.bind(this)
    this.formatField = this.formatField.bind(this)
  }

  componentDidMount() {
    if (this.props.data.ownership_info !== null) {
      this.setState({
        userRating: this.props.data.ownership_info.user_rating,
      })
    }
  }

  formatField(fieldName) {
    const splitWords = fieldName.replace(/_/, " ").split(" ")
    const upcasedWords = splitWords.map((word) => {
      return(
        word.charAt(0).toUpperCase() + word.slice(1)
      )
    })
    const formattedField = upcasedWords.join(" ")

    return formattedField
  }

  updateUserRating(ratingValue) {
    if (this.props.data.ownership_info) {
      const ownershipId = this.props.data.ownership_info.ownership_id
      const type = this.props.type

      const formPayload = {
        [`${type}_ownership`]: {
          user_rating: ratingValue
        }
      }
      fetch(`/api/v1/${type}_ownerships/${ownershipId}.json`, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload)
      })
      .then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ userRating: body.user_rating })
      })
      .catch(error => console.error(`Error in fetch patch: ${error.message}`))
    }
  }

  removeMedia(event) {
    event.preventDefault()
    const result = window.confirm("Are you sure you want to remove this item from your collection?")

    if (result === false) {
      return false
    }

    const ownershipId = this.props.data.ownership_info.ownership_id
    const type = this.props.type
    fetch(`/api/v1/${type}_ownerships/${ownershipId}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
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
      browserHistory.push({
        pathname: "/",
        state: { message: body.message }
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addMedia(event) {
    event.preventDefault()
    const type = this.props.type
    const ownership_field = `${type}_ownership`
    const media_field = `${type}_id`
    const formPayload = {
      [ownership_field]: { [media_field]: this.props.data.id }
    }
    fetch(`/api/v1/${type}_ownerships`, {
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
          throw(error);
        }
      })
      .then(response => {
        return response.json()
      })
      .then(body => {
        this.props.passMessage(body.message)
        this.props.fetchData()
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`)
      });
  }

  render() {
    let action, onClickFunction;
    if (this.props.data.ownership_info) {
      action = "Remove From Collection"
      onClickFunction = this.removeMedia
    }
    else {
      action = "Add To Collection"
      onClickFunction = this.addMedia
    }

    const excluded = ['id', 'imdb_rating', 'ownership_info', 'poster', 'name', 'description', 'genres']
    const midDisplayFields = Object.keys(this.props.data).filter(field => !excluded.includes(field))

    let key = 0
    const displayItems = midDisplayFields.map((fieldName) => {
      if (this.props.data[fieldName]) {
        key++
        return <p key={key}>{`${this.formatField(fieldName)}: ${this.props.data[fieldName]}`}</p>
      }
    })

    let photoField
    if (this.props.data.poster.url !== null) {
      photoField = <img className="showpage-poster" src={this.props.data.poster.url}></img>
    }
    else {
      photoField =
        <PosterUploader
          id={this.props.data.id}
          type={this.props.type}
          uploader={this.props.uploader}
        />
    }

    const genresArray = this.props.data.genres.map((genre) => {
      return genre.name
    })
    const genresString = genresArray.sort().join(', ')

    return(
      <div className="media-info small-12 medium-12 large-12 columns">
        <div className="small-12 medium-12 large-12 columns">
          <h1 className="title-header">{this.props.data.name}</h1>
        </div>
        <div className="small-12 medium-6 large-4 columns">
          {photoField}
        </div>
        <div className="small-12 medium-6 large-4 columns">
          {displayItems}
          <p>Genres: {genresString}</p>
        </div>
        <div className="small-12 medium-6 large-4 columns">
          <p>IMDb Rating: {this.props.data.imdb_rating}</p>
          <p>Your Rating</p>
          <RatingInput
            value={this.state.userRating}
            handleClick={this.updateUserRating}
          />
        </div>
        <div className="description small-12 medium-6 large-8 columns">
          <p>Description: {this.props.data.description}</p>
          <ToggleOwnershipButton
            onClickfunction={onClickFunction}
            text={action}
          />
        </div>
      </div>
    )
  }
}

export default MediaInfoTile
