import React, { Component} from 'react'
import { Link } from 'react-router'

import MediaPreview from '../components/MediaPreview'
import PageButton from '../components/PageButton'

class MediaIndexTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slicePoint1: 0,
      slicePoint2: 6,
      slicePoint3: 12
    }

    this.pageFlip = this.pageFlip.bind(this)
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

  render() {
    let media = this.props.media

    let topPreviewTiles
    let bottomPreviewTiles
    let addMedia
    let backButton
    let nextButton

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

    return(
      <div>
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
    )
  }
}

export default MediaIndexTile
