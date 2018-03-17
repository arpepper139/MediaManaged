import React, { Component } from 'react'

import SortDropdown from '../components/SortDropdown'
import genreOptions from '../constants/GenreOptions'
import typeOptions from '../constants/TypeOptions'
import ratingOptions from '../constants/RatingOptions'

class SortBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeFieldhidden: true,
      genreFieldHidden: true,
      ratingFieldHidden: true
    }

    this.toggleHidden = this.toggleHidden.bind(this)
  }

  toggleHidden(sortField, priorValue) {
    const nextValue = !priorValue
    if (sortField == 'Type') {
      this.setState({
        typeFieldhidden: nextValue,
        genreFieldHidden: true,
        ratingFieldHidden: true
      })
    }
    else if (sortField == 'Genre') {
      this.setState({
        typeFieldhidden: true,
        genreFieldHidden: nextValue,
        ratingFieldHidden: true
      })
    }
    else {
      this.setState({
        typeFieldhidden: true,
        genreFieldHidden: true,
        ratingFieldHidden: nextValue
      })
    }
  }

  render() {
    return(
      <div className="sort-div">
        <ul className="sort-bar">
          <SortDropdown
            sortField='Type'
            options={typeOptions}
            sortMedia={this.props.sortMedia}
            hidden={this.state.typeFieldhidden}
            toggleHidden={this.toggleHidden}
          />
          <SortDropdown
            sortField='Genre'
            options={genreOptions}
            sortMedia={this.props.sortMedia}
            hidden={this.state.genreFieldHidden}
            toggleHidden={this.toggleHidden}
          />
          <SortDropdown
            sortField='Rating'
            options={ratingOptions}
            sortMedia={this.props.sortMedia}
            hidden={this.state.ratingFieldHidden}
            toggleHidden={this.toggleHidden}
          />
        </ul>
        <p className="sort-result-message">{this.props.sortMessage}</p>
      </div>
    )
  }
}

export default SortBar
