import React from 'react'
import { Link } from 'react-router'

const MediaPreview = ({ poster, type, name, id }) => {

  let posterStyle = {
    backgroundImage: 'url(' + poster + ')',
  }

  let noPosterStyle = {
    backgroundColor: '#C3C3C3'
  }

  let preview
  if (poster === null) {
    preview = <div className="preview-picture" style={noPosterStyle}>
      <p>{name}</p>
      <i className="fas fa-film"></i>
    </div>
  }
  else {
    preview = <div className="preview-picture" style={posterStyle} alt={name} />
  }

  return(
    <Link to={`/${type}s/${id}`}>
      <div className="preview-tile">
        {preview}
      </div>
    </Link>
  )
}

export default MediaPreview
