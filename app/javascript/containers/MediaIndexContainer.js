import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import MediaPreview from '../components/MediaPreview'
import PageButton from '../components/PageButton'
import FlashNotice from '../components/FlashNotice'

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
    this.clearFlash = this.clearFlash.bind(this)
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

  pageFlip(value) {
    event.preventDefault()
    let flip = (value === "right" ? 12 : -12)

    let currentSlice1 = this.state.slicePoint1
    let currentSlice2 = this.state.slicePoint2
    let currentSlice3 = this.state.slicePoint3

    this.setState({
      slicePoint1: currentSlice1 + flip,
      slicePoint2: currentSlice2 + flip,
      slicePoint3: currentSlice3 + flip
    })
  }

  clearFlash() {
    browserHistory.replace({
        pathname: '/',
        state: null
    })
  }

  render() {
    let media = this.state.media

    let flashNotice
    let returnedJSX
    let topPreviewTiles
    let bottomPreviewTiles
    let backButton
    let nextButton

    if (this.props.location.state) {
      flashNotice =
        <FlashNotice
          message={this.props.location.state.message}
          clearFlash={this.clearFlash}
        />
    }

    if (media.length !== 0) {
      let key = 0
      let mediaPreviewTiles = media.map((media_object) => {
        let type = `${media_object.director ? "movie" : "show"}`
        key++

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
        backButton =
          <PageButton
            direction="left"
            pageFlip={ this.pageFlip }
          />
      }

      if (this.state.slicePoint3 < media.length) {
        nextButton =
          <PageButton
            direction="right"
            pageFlip={ this.pageFlip }
          />
      }
    }

    return(
      <div>
        {flashNotice}
        <div className="homepage">
          <div className="main-col small-12 large-12 columns">
            <div>{ topPreviewTiles }</div>
            <div>{ bottomPreviewTiles }</div>
          </div>
          <div className="homepage-options">
            <Link to={'/media/new'}>
              <button className="add-media">Add Media</button>
            </Link>
            <div className="pagination">
              {backButton}
              {nextButton}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MediaIndexContainer
