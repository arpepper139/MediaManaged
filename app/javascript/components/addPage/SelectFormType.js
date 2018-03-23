import React from 'react'

const SelectFormType = ({ selectForm }) => {
  return(
    <div className="select-prompt">
      <p>We couldn't find anything. Add it below!</p>
      <div className="select-buttons">
        <button className='movie-select-button' value="movie" onClick={ selectForm }>Add Movie</button>
        <button className='show-select-button' value="show" onClick={ selectForm }>Add Show</button>
      </div>
    </div>
  )
}

export default SelectFormType
