import React, { Component } from 'react'
import RatingInput from '../components/RatingInput.js'

class MediaInfoTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: ''
    }

    this.updateUserRating = this.updateUserRating.bind(this)
    this.removeMedia = this.removeMedia.bind(this)
  }

  componentDidMount() {
    this.setState({
      userRating: this.props.data.ownership_info.user_rating,
    })
  }

  updateUserRating(ratingValue) {
    let ownershipId = this.props.data.ownership_info.ownership_id
    let type = this.props.type

    let formPayload = {
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

  removeMedia() {
    debugger
  }

  render() {
    console.log(this.state)

    const buttonText = `${this.props.data.ownership_info.ownership_id ? "Remove From Collection" : "Add To Collection"}`

    return(
      <div className="media-info small-12 medium-12 large-12 columns">
        <div className="small-12 medium-12 large-12 columns">
          <h1 className="title-header">{this.props.data.name}</h1>
        </div>
        <div className="small-12 medium-6 large-4 columns">
          <img className="showpage-poster" src={this.props.data.poster.url}></img>
        </div>
        <div className="small-12 medium-6 large-4 columns">
          <p>Director(s): {this.props.data.director}</p>
          <p>Year: {this.props.data.year}</p>
          <p>Writer(s): {this.props.data.writer}</p>
          <p>Years: {this.props.data.start_year}-{this.props.data.end_year}</p>
          <p>Studio: {this.props.data.studio}</p>
          <p>Runtime: {this.props.data.runtime}</p>
        </div>
        <div className="small-12 medium-6 large-4 columns">
          <p>IMDb Rating: {this.props.data.imdb_rating}</p>
          {/* Only Render Your Rating If Ownership Id Present */}
          <p>Your Rating</p>
          <RatingInput
            value={this.state.userRating}
            handleClick={this.updateUserRating}
          />
        </div>
        <div className="small-12 medium-6 large-8 columns">
          <p>Description: {this.props.data.description}</p>
          <button type="button">{buttonText}</button>
        </div>
      </div>
    )
  }
}

export default MediaInfoTile
