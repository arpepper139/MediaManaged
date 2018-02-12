import React from 'react'
import { Link } from 'react-router'

const NewMediaButton = ({ selectedClass }) => {

  return(
    <Link to={'/media/new'}>
      <button className={selectedClass}>Add Media</button>
    </Link>
  )
}

export default NewMediaButton
