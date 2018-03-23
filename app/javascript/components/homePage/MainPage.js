import React from 'react'
import MediaIndexTile from './MediaIndexTile'
import SortBar from '../../containers/SortBar'

const MainPage = ({ sortMedia, sortMessage, media, pageFlip, slicePoint1, slicePoint2 }) => {
  return(
    <div className="homepage">
      <h1 className="media-greeting">Explore your personal video collection!</h1>
      <SortBar
        sortMedia={sortMedia}
        sortMessage={sortMessage}
      />
      <MediaIndexTile
        media={media}
        pageFlip={pageFlip}
        slicePoint1={slicePoint1}
        slicePoint2={slicePoint2}
      />
    </div>
  )
}

export default MainPage
