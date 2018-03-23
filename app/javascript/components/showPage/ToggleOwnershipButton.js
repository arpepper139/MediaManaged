import React from 'react'

const ToggleOwnershipButton = ({onClickfunction, text}) => {
  return(
    <button type="button" onClick={onClickfunction}>{text}</button>
  )
}

export default ToggleOwnershipButton
