import React from 'react'

const TextArea = (props) => {
  return(
    <label>{props.label}
      <textarea value={props.value} name={props.name} onChange={props.handleChange}>
      </textarea>
    </label>
  )
}

export default TextArea
