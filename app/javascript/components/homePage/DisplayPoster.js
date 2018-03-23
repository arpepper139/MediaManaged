import React from 'react';

const DisplayPoster = ({ url, alt }) => {
  const style = {
    backgroundImage: 'url(' + url + ')',
  };

  return(
    <div className="preview-picture" style={style} alt={alt} />
  );
};

export default DisplayPoster;
