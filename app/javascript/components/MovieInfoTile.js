import React from 'react'

const MovieInfoTile = (props) => {
  const owned = `${props.data.owned ? "Yes" : "No"}`

  return(
    <div className="small-12 large-12 columns">
      <div className="small-12 medium-6 large-4 columns">
        <img className="showpage-poster" src={props.data.poster.url}></img>
      </div>
      <div className="small-12 medium-6 large-8 columns">
        <p>Movie: {props.data.name}</p>
        <p>Director(s): {props.data.director}</p>
        <p>Year: {props.data.year}</p>
        <p>Description: {props.data.description}</p>
        <p>Owned? {owned}</p>
        <p>Your Rating</p>
      </div>
    </div>
  )
}

export default MovieInfoTile
