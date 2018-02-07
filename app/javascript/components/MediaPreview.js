import React from 'react'
import { Link } from 'react-router'

const MediaPreview = (props) => {

  let divStyle = {
    backgroundImage: 'url(' + props.poster + ')'
  }

  let preview
  if (props.poster === null) {
    preview = <div className="preview-item">{props.name}</div>
  }
  else {
    preview = <div className="preview-item" style={divStyle} alt={props.name} />
  }

  return(
    <Link to={`/${props.type}s/${props.id}`}>
      <div className="col small-12 medium-4 large-2 columns">
        {preview}
      </div>
    </Link>
  )
}

export default MediaPreview
