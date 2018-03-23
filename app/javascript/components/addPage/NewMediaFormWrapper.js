import React from 'react'

const NewMediaFormWrapper = ({ type, children }) => {
  let formHeader, iconClass

  if (type === 'movie') {
    formHeader = 'Add New Movie'
    iconClass = 'fas fa-ticket-alt'
  }
  else if (type === 'show') {
    formHeader = 'Add New Show'
    iconClass = 'fas fa-video'
  }

  return(
    <div className='new-media-form'>
      <h1 className="form-header"><i className={iconClass}></i> {formHeader}</h1>
      {children}
    </div>
  )
}

export default NewMediaFormWrapper
