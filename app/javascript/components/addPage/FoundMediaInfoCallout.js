import React from 'react';

const FoundMediaInfoCallout = ({ foundInfo, closeDisplay }) => {

  const formatField = (fieldName) => {
    const splitWords = fieldName.replace(/_/, " ").split(" ");
    const upcasedWords = splitWords.map((word) => {
      return(
        word.charAt(0).toUpperCase() + word.slice(1)
      );
    });
    const formattedField = upcasedWords.join(" ");

    return formattedField;
  };

  const displayInfo = () => {
    const excluded = ['poster', 'name', 'studio', 'imdb_rating'];
    const displayFields = Object.keys(foundInfo).filter(field => !excluded.includes(field));

    const descriptionIndex = displayFields.indexOf('description');
    const description = displayFields.splice(descriptionIndex, 1)[0];
    displayFields.push(description);

    let key = 0;
    const mediaDetails = displayFields.map((fieldName) => {
      if (foundInfo[fieldName]) {
        key++;
        return(
          <p key={key}>{`${formatField(fieldName)}: ${foundInfo[fieldName]}`}</p>
        );
      }
    });

    return mediaDetails;
  }

  const posterStyle = {
    backgroundImage: 'url(' + foundInfo.poster + ')',
  };

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
            {displayInfo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundMediaInfoCallout;
