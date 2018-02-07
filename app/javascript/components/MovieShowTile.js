import React from 'react'

const MovieShowTile = (props) => {
  return(
    <div className="small-12 large-12 columns">
      <div className="small-12 medium-6 large-4 columns">
        <img className="showpage-poster" src={props.data.poster.url}></img>
      </div>
      <div className="small-12 medium-6 large-8 columns">
        <p>{props.data.name}</p>
        <p>{props.data.director}</p>
        <p>{props.data.year}</p>
        <p>{props.data.description}</p>
      </div>
    </div>
  )
}

export default MovieShowTile
