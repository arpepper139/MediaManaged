import React from 'react'
import { Link } from 'react-router'

import MediaPreview from '../components/MediaPreview'
import PageButton from '../components/PageButton'

const MediaIndexTile = (props) => {
  let addMedia, pageBack, pageForward
  let media = props.media

  let key = 0
  let displayMedia = media.slice(props.slicePoint1, props.slicePoint2)

  let mediaPreviewTiles = displayMedia.map((mediaObject) => {
    let type = `${mediaObject.director ? "movie" : "show"}`
    key++

    return(
      <MediaPreview
        key={key}
        id={mediaObject.id}
        name={mediaObject.name}
        poster={mediaObject.poster.url}
        type={type}
      />
    )
  })

  if (props.slicePoint1 !== 0 ) {
    pageBack = props.pageFlip
  }

  if (props.slicePoint2 < media.length) {
    pageForward = props.pageFlip
  }

  return(
    <div>
      <div className="media-display">
        <div>
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
        <div>
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

export default MediaIndexTile
