import React from 'react'
import { Link } from 'react-router'

const MediaPreview = (props) => {

  let poster;
  if (props.poster === null) {
    poster = <p>{props.name}</p>
  }
  else {
    poster = <img src={props.poster} />
  }

  return(
    <Link to={`/${props.type}s/${props.id}`}>
      <div className="col small-12 medium-4 large-2 columns">
        {poster}
      </div>
    </Link>
  )
}

export default MediaPreview
