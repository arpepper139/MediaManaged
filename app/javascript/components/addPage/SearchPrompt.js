import React from 'react'

const SearchPrompt = ({ omdbQuery }) => {
  return(
    <div className="search-prompt">
      <p>Can't find what you're looking for?</p>
      <button onClick={ omdbQuery }>Search The Web</button>
    </div>
  )
}

export default SearchPrompt
