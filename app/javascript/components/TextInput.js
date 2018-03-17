import React from 'react'

const TextInput = ({ name, label, value, placeholder, handleChange }) => {
  return(
    <label className={ `${name}-label` }>{label}
      <input
        placeholder={placeholder}
        type='text'
        value={value}
        name={name}
        onChange={handleChange}
      />
    </label>
  )
}

export default TextInput
