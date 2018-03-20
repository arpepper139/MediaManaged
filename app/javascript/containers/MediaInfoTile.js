import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import FlashNotice from '../components/FlashNotice'

import MediaDetailsDisplay from '../components/MediaDetailsDisplay'

import RatingInput from '../components/RatingInput'
import ToggleOwnershipButton from '../components/ToggleOwnershipButton'
import PosterUploader from '../components/PosterUploader'

class MediaInfoTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: ''
    }

    this.updateUserRating = this.updateUserRating.bind(this)
    this.removeMedia = this.removeMedia.bind(this)
    this.addMedia = this.addMedia.bind(this)
  }

  componentDidMount() {
    if (this.props.data.ownership_info !== null) {
      this.setState({
        userRating: this.props.data.ownership_info.user_rating,
      })
    }
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

  renderImageArea() {
    if (this.props.data.poster.url !== null) {
      return <img src={this.props.data.poster.url}></img>
    }
    else {
      return(
        <PosterUploader
          id={this.props.data.id}
          type={this.props.type}
          uploader={this.props.uploader}
        />
      )
    }
  }

  render() {
    const owned = this.props.data.ownership_info
    const ownershipAction = `${owned ? 'Remove From Collection' : 'Add To Collection'}`
    const ownershipOnClick = owned ? this.removeMedia : this.addMedia

    return(
      <div className="media-info-tile">
        <h1>{this.props.data.name}</h1>
        <div className="info-display">
          <div className="poster-div">
            {this.renderImageArea()}
          </div>
          <div className="movie-details">
            <div className="info-div">
              <MediaDetailsDisplay
                mediaData={this.props.data}
              />
              <div className="col">
                <p>IMDb Rating: {this.props.data.imdb_rating}</p>
                <p>Your Rating</p>
                <RatingInput
                  value={this.state.userRating}
                  handleClick={this.updateUserRating}
                />
              </div>
            </div>
            <div className="manage-ownership">
              <p>Description: {this.props.data.description}</p>
              <ToggleOwnershipButton
                onClickfunction={ownershipOnClick}
                text={ownershipAction}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MediaInfoTile
