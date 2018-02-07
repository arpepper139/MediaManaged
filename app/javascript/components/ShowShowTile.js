import React from 'react'

const ShowShowTile = (props) => {
  return(
    <div className="small-12 large-12 columns">
      <div className="small-12 medium-6 large-4 columns">
        <img className="show-poster" src={props.data.poster.url}></img>
      </div>
      <div className="small-12 medium-6 large-8 columns">
        <p>{props.data.name}</p>
        <p>{props.data.writer}</p>
        <p>{props.data.start_year}-{props.data.end_year}</p>
        <p>{props.data.description}</p>
      </div>
    </div>
  )
}

export default ShowShowTile
