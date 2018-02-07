import React from 'react'
import { Link } from 'react-router'

const MediaPreview = (props) => {

  return(
    <Link to={`/${props.type}s/${props.id}`}>
      <div className="col small-12 medium-4 large-2 columns">
        <img className="preview-item" src={props.poster} alt={props.name} />
      </div>
    </Link>
  )
}

export default MediaPreview
