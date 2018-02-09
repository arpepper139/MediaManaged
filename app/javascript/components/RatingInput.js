import React from 'react'

const RatingField = (props) => {
  let ratingOptions = props.ratings.map((rating) => {
    return(
      <label className="radio-label" key={rating} htmlFor={props.name}>{rating}
        <input type="radio" name={props.name} value={rating} onChange={props.handleChange} />
      </label>
    )
  })

  return(
    <div className="rating-field">
      {ratingOptions}
    </div>
  )
}

export default RatingField
