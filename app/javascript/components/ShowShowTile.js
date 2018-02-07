import React from 'react'

const ShowShowTile = (props) => {
  let owned
  if (props.data.owned) {
    owned = "Yes"
  }
  else {
    owned = "No"
  }

  return(
    <div className="small-12 large-12 columns">
      <div className="small-12 medium-6 large-4 columns">
        <img className="show-poster" src={props.data.poster.url}></img>
      </div>
      <div className="small-12 medium-6 large-8 columns">
        <p>Show: {props.data.name}</p>
        <p>Writer(s): {props.data.writer}</p>
        <p>Years: {props.data.start_year}-{props.data.end_year}</p>
        <p>Description: {props.data.description}</p>
        <p>Owned? {owned}</p>
      </div>
    </div>
  )
}

export default ShowShowTile
