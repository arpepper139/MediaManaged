import React from 'react'

const Button = ({onClickfunction, text}) => {
  return(
    <button type="button" onClick={onClickfunction}>{text}</button>
  )
}

export default Button
