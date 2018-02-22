import React from 'react'
import MediaIndexTile from '../components/MediaIndexTile'
import SortBar from '../containers/SortBar'

const MainPage = (props) => {
  return(
    <div className="homepage">
      <SortBar
        sortMedia={props.sortMedia}
        sortMessage={props.sortMessage}
      />
      <MediaIndexTile
        media={props.media}
        pageFlip={props.pageFlip}
        slicePoint1={props.slicePoint1}
        slicePoint2={props.slicePoint2}
      />
    </div>
  )
}

export default MainPage
