import React from 'react'

const SortDropdown = (props) => {
  let key = 0
  let formattedType = props.sortField.toLowerCase()
  let sortOptions = props.options.map((option) => {
    key++
    return(
      <p key={key} onClick={() => props.sortMedia(formattedType, option.value)}>{option.display}</p>
    )
  })

  return(
    <li className="dropdown dropbtn">
      <p className="option">By {props.sortField}</p>
      <div className ="dropdown-content">
        {sortOptions}
      </div>
    </li>
  )
}

export default SortDropdown
