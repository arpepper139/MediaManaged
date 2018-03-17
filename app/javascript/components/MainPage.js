import React from 'react'
import MediaIndexTile from '../components/MediaIndexTile'
import SortBar from '../containers/SortBar'

const MainPage = ({ sortMedia, sortMessage, media, pageFlip, slicePoint1, slicePoint2 }) => {
  return(
    <div className="homepage">
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
