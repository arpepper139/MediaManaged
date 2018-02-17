import React, { Component} from 'react'
import { Link } from 'react-router'

import MediaPreview from '../components/MediaPreview'
import PageButton from '../components/PageButton'

class MediaIndexTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slicePoint1: 0,
      slicePoint2: 12
    }

    this.pageFlip = this.pageFlip.bind(this)
  }

  pageFlip(value) {
    event.preventDefault()
    let flip = (value === "right" ? 12 : -12)

    let currentSlice1 = this.state.slicePoint1
    let currentSlice2 = this.state.slicePoint2

    this.setState({
      slicePoint1: currentSlice1 + flip,
      slicePoint2: currentSlice2 + flip
    })
  }

  render() {
    let addMedia, pageBack, pageForward
    let media = this.props.media

    let key = 0
    let displayMedia = media.slice(this.state.slicePoint1, this.state.slicePoint2)

    let mediaPreviewTiles = displayMedia.map((media_object) => {
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

    if (this.state.slicePoint1 !== 0 ) {
      pageBack = this.pageFlip
    }

    if (this.state.slicePoint2 < media.length) {
      pageForward = this.pageFlip
    }

    return(
      <div>
        <div className="media-display">
          <div className="medium-up-pagination">
            <PageButton
              direction="left"
              pageFlip={ pageBack }
            />
          </div>
          <div className="media-panel">
            <div className="tiles-group">
              <div className="tiles">
                {mediaPreviewTiles.slice(0, 3)}
              </div>
              <div className="tiles">
                {mediaPreviewTiles.slice(3, 6)}
              </div>
            </div>
            <div className="tiles-group">
              <div className="tiles">
                {mediaPreviewTiles.slice(6, 9)}
              </div>
              <div className="tiles">
                {mediaPreviewTiles.slice(9, 12)}
              </div>
            </div>
          </div>
          <div className="medium-up-pagination">
            <PageButton
              direction="right"
              pageFlip={ pageForward }
            />
          </div>
        </div>

        <div className="new-media-button">
          <Link to={'/media/new'}>
            <button>Add Media</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default MediaIndexTile
