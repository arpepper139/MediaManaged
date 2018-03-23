import React from 'react';
import { Link } from 'react-router';

import DisplayGroup from './DisplayGroup';
import MediaPreview from './MediaPreview';
import PageButton from './PageButton';

const CollectionDisplay = ({ media, slicePoint1, slicePoint2, pageFlip }) => {
  const displayMedia = media.slice(slicePoint1, slicePoint2);

  let key = 0;
  const mediaPreviewTiles = displayMedia.map((mediaObject) => {
    const type = `${mediaObject.director ? 'movie' : 'show'}`;
    key++;

    return(
      <MediaPreview
        key={key}
        id={mediaObject.id}
        name={mediaObject.name}
        poster={mediaObject.poster.url}
        type={type}
      />
    );
  });

  const allowPageBack = () => {
    if (slicePoint1 !== 0) {
      return pageFlip;
    }
  };

  const allowPageForward = () => {
    if (slicePoint2 < media.length) {
      return pageFlip;
    }
  };

  return(
    <div>
      <div className="media-display">
        <PageButton
          direction="left"
          pageFlip={allowPageBack()}
        />
        <div className="media-panel">
          <DisplayGroup
            previewTiles={mediaPreviewTiles.slice(0, 6)}
          />
          <DisplayGroup
            previewTiles={mediaPreviewTiles.slice(6, 12)}
          />
        </div>
        <PageButton
          direction="right"
          pageFlip={allowPageForward()}
        />
      </div>
      <div className="new-media-button">
        <Link to={'/media/new'}>
          <button>Add Media</button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionDisplay;
