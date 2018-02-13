import React from 'react'

const SortDropdown = (props) => {
  let key = 0
  let sortOptions = props.options.map((option) => {
    key++
    return(
      <p key={key}>{option}</p>
    )
  })

  return(
    <li className="dropdown dropbtn">
      <p>{props.sortField}</p>
      <div className ="dropdown-content">
        {sortOptions}
      </div>
    </li>
  )
}




export default SortDropdown
