import React from 'react'

const FlashNotice = ({ message, clearFlash }) => {
  return(
    <div className="flash">
      {message}
      <div id="close-flash">
        <i className="fas fa-times" aria-hidden="true" onClick={clearFlash}></i>
      </div>
    </div>
  )
}

export default FlashNotice
