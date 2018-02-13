import React from 'react'
import MediaIndexTile from '../containers/MediaIndexTile'
import SortBar from '../containers/SortBar'

const MainPage = (props) => {
  return(
    <div className="homepage">
      <SortBar />
      <MediaIndexTile
        media={props.media}
      />
    </div>
  )
}

export default MainPage
