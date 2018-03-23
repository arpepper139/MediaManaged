import React from 'react'

const TextArea = ({ label, value, name, handleChange }) => {
  return(
    <label>{label}
      <textarea value={value} name={name} onChange={handleChange}>
      </textarea>
    </label>
  )
}

export default TextArea
