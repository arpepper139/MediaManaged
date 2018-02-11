import React from 'react'

const RatingInput = ({ name, handleClick, value, label }) => {
  let ratingsArray = Array.from(Array(5).keys());

  let ratingOptions = ratingsArray.map((rating) => {
    const ratingValue = rating + 1;
    const star = `fa${ratingValue <= value ? "s" : "r"} fa-star`

    return(
      <button
        key={ratingValue}
        type="button"
        name={name}
        onClick={() => handleClick(ratingValue)}
      >
        <i className={star}></i>
      </button>
    )
  })

  return(
    <div className="rating-field">
      {ratingOptions}
    </div>
  )
}

export default RatingInput
