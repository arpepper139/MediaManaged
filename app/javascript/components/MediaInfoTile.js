import React, { Component } from 'react'
import RatingInput from '../components/RatingInput.js'

class MediaInfoTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: '',
      ownershipId: ''
    }

    this.updateUserRating = this.updateUserRating.bind(this)
    this.removeMedia = this.removeMedia.bind(this)
  }

  componentDidMount() {
    this.setState({
      userRating: this.props.data.ownership_info.user_rating,
      ownershipId: this.props.data.ownership_info.ownership_id
    })
  }

  updateUserRating(ratingValue) {
    
    debugger
  }

  removeMedia() {
    debugger
  }

  render() {
    console.log(this.state)

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
