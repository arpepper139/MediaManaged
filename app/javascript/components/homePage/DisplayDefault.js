import React from 'react';

const DisplayDefault = ({ name }) => {
  return(
    <div className="preview-picture">
      <p>{name}</p>
      <i className="fas fa-film"></i>
    </div>
  );
};

export default DisplayDefault;
