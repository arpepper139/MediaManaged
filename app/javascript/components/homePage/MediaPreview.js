import React from 'react';
import { Link } from 'react-router';

import DisplayDefault from './DisplayDefault';
import DisplayPoster from './DisplayPoster';

const MediaPreview = ({ poster, type, name, id }) => {

  const renderPreviewImage = () => {
    if (poster === null) {
      return(
        <DisplayDefault
          name={name}
        />
      );
    }
    else {
      return(
        <DisplayPoster
          url={poster}
          alt={name}
        />
      );
    }
  };

  return(
    <Link to={`/${type}s/${id}`}>
      <div className="preview-tile">
        {renderPreviewImage()}
      </div>
    </Link>
  );
};

export default MediaPreview;
