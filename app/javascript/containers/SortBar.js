import React, { Component } from 'react'

import SortDropdown from '../components/SortDropdown'

class SortBar extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <ul className="sort-bar">
        <SortDropdown
          sortField="Type"
          options={["Movie", "Show"]}
        />
        <SortDropdown
          sortField="Genre"
          options={["Action", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi"]}
        />
        <SortDropdown
          sortField="Rating"
          options={["Five Star", "Four Star", "Three Star", "Two Star", "One Star"]}
        />
      </ul>
    )
  }
}

export default SortBar
