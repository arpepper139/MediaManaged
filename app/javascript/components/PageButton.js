import React from 'react'

const PageButton = ({ direction, pageFlip }) => {
  const arrowClass = `fas fa-arrow-${direction}`

  return(
    <button type="button" onClick={() => pageFlip(direction)}>
      <i className={arrowClass} onClick={() => pageFlip(direction)}></i>
    </button>
  )
}

export default PageButton
