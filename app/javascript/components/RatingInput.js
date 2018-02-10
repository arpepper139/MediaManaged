import React from 'react'

const RatingInput = (props) => {
  let ratingOptions = props.ratings.map((rating) => {
    return(
      <label className="radio-label" key={rating} htmlFor={props.name}>{rating}
        <input type="radio" name={props.name} value={rating} onChange={props.handleChange} />
      </label>
    )
  })

  return(
    <div className="rating-field">
      <label>{props.label}</label>
      {ratingOptions}
    </div>
  )
}

export default RatingInput
