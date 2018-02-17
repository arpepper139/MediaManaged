import React from 'react'
import { Link } from 'react-router'

const MediaPreview = (props) => {

  let posterStyle = {
    backgroundImage: 'url(' + props.poster + ')',
  }

  let noPosterStyle = {
    backgroundColor: '#C3C3C3'
  }

  let preview
  if (props.poster === null) {
    preview = <div className="preview-picture" style={noPosterStyle}>
      <p>{props.name}</p>
      <i className="fas fa-film"></i>
    </div>
  }
  else {
    preview = <div className="preview-picture" style={posterStyle} alt={props.name} />
  }

  return(
    <Link to={`/${props.type}s/${props.id}`}>
      <div className="preview-tile">
        {preview}
      </div>
    </Link>
  )
}

export default MediaPreview
