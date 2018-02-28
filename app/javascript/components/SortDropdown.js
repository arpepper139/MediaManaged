import React, { Component } from 'react'

const SortDropdown = (props) => {
  let key = 0
  let formattedType = props.sortField.toLowerCase()
  let sortOptions = props.options.map((option) => {
    key++
    return(
      <p key={key} onClick={() => props.sortMedia(formattedType, option.value)}>{option.display}</p>
    )
  })

  let hidden = props.hidden
  let dropdownClass = `dropdown ${ !hidden ? 'dropdown-active' : ''}`

  return(
    <li className={dropdownClass} onClick={() => props.toggleHidden(props.sortField, props.hidden)}>
      <p className="option">By {props.sortField}</p>
      <div className="dropdown-content">
        {sortOptions}
      </div>
    </li>
  )
}

export default SortDropdown
