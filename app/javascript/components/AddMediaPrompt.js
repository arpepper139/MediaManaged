import React from 'react'
import { Link } from 'react-router'

const AddMediaPrompt = (props) => {

  return(
    <div>
      <h1 className="no-media-greeting">Create your personal video collection!</h1>
      <div className="no-media-landing">
        <div className="prompt-to-add">
          <Link to={'/media/new'}>
            <button className="add-media">Add Media</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddMediaPrompt
