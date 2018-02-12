import React from 'react'
import { Link } from 'react-router'

const AddMediaPrompt = (props) => {

  return(
    <div className="no-media-landing">
      <div className="prompt-to-add">
        <p>Start building your collection!</p>
        <Link to={'/media/new'}>
          <button className="add-media">Add Media</button>
        </Link>
      </div>
    </div>
  )
}

export default AddMediaPrompt