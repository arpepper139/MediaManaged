import React from 'react'

import SortDropdown from '../components/SortDropdown'

const typeOptions = [
  {
    display: "Movie",
    value: "movie"
  },
  {
    display: "Show",
    value: "show"
  }
]

const genreOptions = [
  {
    display: "Action",
    value: "Action"
  },
  {
    display: "Animation",
    value: "Animation"
  },
  {
    display: "Comedy",
    value: "Comedy"
  },
  {
    display: "Drama",
    value: "Drama"
  },
  {
    display: "Fantasy",
    value: "Fantasy"
  },
  {
    display: "Horror",
    value: "Horror"
  },
  {
    display: "Romance",
    value: "Romance"
  },
  {
    display: "Sci-Fi",
    value: "Sci-Fi"
  }
]

const ratingOptions = [
  {
    display: "Five Stars",
    value: 5
  },
  {
    display: "Four Stars",
    value: 4
  },
  {
    display: "Three Stars",
    value: 3
  },
  {
    display: "Two Stars",
    value: 2
  },
  {
    display: "One Star",
    value: 1
  }
]

const SortBar = (props) => {
  return(
    <ul className="sort-bar">
      <SortDropdown
        sortField="Type"
        options={typeOptions}
        sortMedia={props.sortMedia}
      />
      <SortDropdown
        sortField="Genre"
        options={genreOptions}
        sortMedia={props.sortMedia}
      />
      <SortDropdown
        sortField="Rating"
        options={ratingOptions}
        sortMedia={props.sortMedia}
      />
    </ul>
  )
}

export default SortBar
