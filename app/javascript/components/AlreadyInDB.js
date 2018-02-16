import React from 'react'

const AlreadyInDB = ({ title }) => {
  return(
    <div className="in-database-message">
      <p>{`We found ${title}, but you shouldn't need a web search to add that one.`} Try searching our collection again.
      If it doesn't appear, double check that you haven't already added it.</p>
    </div>
  )
}

export default AlreadyInDB
