import React, { Component } from 'react'
import { Link } from 'react-router'

import MediaPreview from '../components/MediaPreview'

class MediaIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      firstName: null,
      lastName: null,
      media: [],
      slicePoint1: 0,
      slicePoint2: 6,
      slicePoint3: 12
    }

    this.pageFlip = this.pageFlip.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/users/current.json', { credentials: 'same-origin' })
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
        userId: body.user.id,
        firstName: body.user.first_name,
        lastName: body.user.last_name,
        media: body.user.media
      })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    });
  }

  pageFlip(event) {
    event.preventDefault()
    let currentSlice1 = this.state.slicePoint1
    let currentSlice2 = this.state.slicePoint2
    let currentSlice3 = this.state.slicePoint3
    if (event.target.value === "back") {
      let nextSlice1 = currentSlice1 - 12
      let nextSlice2 = currentSlice2 - 12
      let nextSlice3 = currentSlice3 - 12
      this.setState({
        slicePoint1: nextSlice1,
        slicePoint2: nextSlice2,
        slicePoint3: nextSlice3
      })
    }
    else if (event.target.value === "next") {
      let nextSlice1 = currentSlice1 + 12
      let nextSlice2 = currentSlice2 + 12
      let nextSlice3 = currentSlice3 + 12
      this.setState({
        slicePoint1: nextSlice1,
        slicePoint2: nextSlice2,
        slicePoint3: nextSlice3
      })
    }
  }

  render() {
    let media = this.state.media

    let returnedJSX
    let topPreviewTiles
    let bottomPreviewTiles
    let backButton
    let nextButton

    if (media.length !== 0) {
      let key = 0
      let mediaPreviewTiles = media.map((media_object) => {
        key++

        let type
        if (media_object.director) {
          type = "movie"
        }
        else {
          type = "show"
        }

        return(
          <MediaPreview
            key={key}
            id={media_object.id}
            name={media_object.name}
            poster={media_object.poster.url}
            type={type}
          />
        )
      })


      topPreviewTiles = mediaPreviewTiles.slice(this.state.slicePoint1, this.state.slicePoint2)
      bottomPreviewTiles = mediaPreviewTiles.slice(this.state.slicePoint2, this.state.slicePoint3)

      if (this.state.slicePoint1 !== 0 ) {
        backButton = <button className="back" value="back" onClick={this.pageFlip}>Back</button>
      }

      if (this.state.slicePoint3 < media.length) {
        nextButton = <button className="back" value="next" onClick={this.pageFlip}>Next</button>
      }
    }

    return(
      <div className="homepage">
        <div className="main-col small-12 large-12 columns">
          <div>{ topPreviewTiles }</div>
          <div>{ bottomPreviewTiles }</div>
        </div>
        <div>
          <Link to={'/media/new'}>
            <button className="add-media">Add Media</button>
          </Link>
          <div className="pagination">
            {backButton}
            {nextButton}
          </div>
        </div>
      </div>
    )
  }
}

export default MediaIndexContainer
