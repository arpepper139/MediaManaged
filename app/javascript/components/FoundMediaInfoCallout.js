import React from 'react'

const FoundMediaInfoCallout = ({ foundInfo, closeDisplay }) => {

  let formatField = (fieldName) => {
    let splitWords = fieldName.replace(/_/, " ").split(" ")
    let upcasedWords = splitWords.map((word) => {
      return(
        word.charAt(0).toUpperCase() + word.slice(1)
      )
    })
    let formattedField = upcasedWords.join(" ")

    return formattedField
  }

  let excluded = ['poster', 'name', 'studio', 'imdb_rating', 'description']
  let infoFields = Object.keys(foundInfo).filter(field => !excluded.includes(field))

  let key = 0
  let infoDisplay = infoFields.map((fieldName) => {
    if (foundInfo[fieldName]) {
      key++
      return <p key={key}>{`${formatField(fieldName)}: ${foundInfo[fieldName]}`}</p>
    }
  })

  let posterStyle = {
    backgroundImage: 'url(' + foundInfo.poster + ')',
  }

  return(
    <div>
      <i className="fas fa-times close-info-display" aria-hidden="true" onClick={closeDisplay}></i>
      <div className="media-info-display">
        <div className="media-info-title">
          <p>{foundInfo.name}</p>
        </div>
        <div className="media-details">
          <div className="media-info-picture" style={posterStyle} alt={foundInfo.name} />
          <div className="media-info-fields">
            {infoDisplay}
            <p>Description: {foundInfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoundMediaInfoCallout
