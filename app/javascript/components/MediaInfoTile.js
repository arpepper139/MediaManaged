import React, { Component } from 'react'
import RatingInput from '../components/RatingInput.js'

class MediaInfoTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: '',
      owned: ''
    }

    this.updateUserRating = this.updateUserRating.bind(this)
    this.removeMedia = this.removeMedia.bind(this)
  }

  updateUserRating() {
    debugger
  }

  removeMedia() {
    debugger
  }

  render() {
    const buttonText = `${this.props.data.owned ? "Remove From Collection" : "Add To Collection"}`

    return(
      <div className="media-info small-12 medium-12 large-12 columns">
        <div className="small-12 medium-12 large-12 columns">
          <h1>{this.props.data.name}</h1>
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
          <p>Your Rating</p>
          <RatingInput
            value={this.props.data.user_rating}
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
