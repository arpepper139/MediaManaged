import React from 'react'

const FlashNotice = ({ message, passMessage }) => {
  return(
    <div className="flash">
      {message}
      <div id="close-flash">
        <i className="fas fa-times" aria-hidden="true" onClick={() => passMessage('')}></i>
      </div>
    </div>
  )
}

export default FlashNotice
