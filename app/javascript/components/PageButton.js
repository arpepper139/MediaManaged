import React from 'react'

const PageButton = ({ direction, pageFlip }) => {
  const arrowClass = `fas fa-chevron-${direction}`
  const divClass = `page-button ${pageFlip ? "active" : "inactive"}`

  let handleClick
  if (pageFlip) {
    handleClick = () => pageFlip(direction)
  }
  else {
    handleClick = ''
  }

  return(
    <div className={divClass} onClick={handleClick}>
      <i className={arrowClass} onClick={handleClick}></i>
    </div>
  )
}

export default PageButton
