import React from 'react';

const DisplayGroup = ({ previewTiles }) => {
  return(
    <div className="tiles-group">
      <div className="tiles">
        {previewTiles.slice(0, 3)}
      </div>
      <div className="tiles">
        {previewTiles.slice(3, 6)}
      </div>
    </div>
  );
};

export default DisplayGroup;
