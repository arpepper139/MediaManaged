import React from 'react'

const TextInput = (props) => {
  return(
    <label className={ `${props.name}-label` }>{ props.label }
      <input
        type='text'
        value={ props.value }
        name={ props.name }
        onChange={ props.handleChange }
      />
    </label>
  )
}

export default TextInput
