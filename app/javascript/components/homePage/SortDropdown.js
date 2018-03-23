import React, { Component } from 'react'

const SortDropdown = ({ options, sortMedia, hidden, toggleHidden, sortField }) => {
  let key = 0
  let formattedType = sortField.toLowerCase()

  let sortOptions = options.map((option) => {
    key++
    return(
      <p key={key} onClick={() => sortMedia(formattedType, option.value)}>{option.display}</p>
    )
  })

  let dropdownClass = `dropdown ${ !hidden ? 'dropdown-active' : ''}`

  return(
    <li className={dropdownClass} onClick={() => toggleHidden(sortField, hidden)}>
      <p className="option">By {sortField}</p>
      <div className="dropdown-content">
        {sortOptions}
      </div>
    </li>
  )
}

export default SortDropdown
