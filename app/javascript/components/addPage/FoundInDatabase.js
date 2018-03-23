import React from 'react';

const FoundInDatabase = ({ title }) => {
  return(
    <div className="in-database-message">
      <p>{`We found ${title} in our collection, so you shouldn't need a web search to add that one. `}
      If it didn't appear, double check that you haven't already added it.</p>
    </div>
  );
};

export default FoundInDatabase;
