import React from 'react'

const RatingField = (props) => {
  let ratingOptions = props.ratings.map((rating) => {
    return(
      <label key={rating} htmlFor={props.name}>{rating}
        <input type="radio" name={props.name} value={rating} onChange={props.handleChange} />
      </label>
    )
  })

  return(
    <div>
      <label>{ props.label }</label>
      {ratingOptions}
    </div>
  )
}

export default RatingField
