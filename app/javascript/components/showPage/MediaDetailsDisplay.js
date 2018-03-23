import React from 'react'

const MediaDetailsDisplay = ({ mediaData }) => {

  const formatField = (fieldName) => {
    const splitWords = fieldName.replace(/_/, " ").split(" ")
    const upcasedWords = splitWords.map((word) => {
      return(
        word.charAt(0).toUpperCase() + word.slice(1)
      )
    })
    const formattedField = upcasedWords.join(" ")

    return formattedField
  }

  const displayInfo = () => {
    const excluded = ['id', 'imdb_rating', 'ownership_info', 'poster', 'name', 'description']
    const displayFields = Object.keys(mediaData).filter(field => !excluded.includes(field))

    let key = 0
    const mediaDetails = displayFields.map((fieldName) => {
      key++
      if (mediaData[fieldName]) {
        return <p key={key}>{`${formatField(fieldName)}: ${mediaData[fieldName]}`}</p>
      }
    })

    return mediaDetails
  }

  return(
    <div className="col">
      {displayInfo()}
    </div>
  )
}

export default MediaDetailsDisplay
