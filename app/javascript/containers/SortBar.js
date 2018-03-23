import React, { Component } from 'react'

import SortDropdown from '../components/homePage/SortDropdown'
import sortBarOptions from '../constants/sortBarOptions'

class SortBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeFieldHidden: true,
      genreFieldHidden: true,
      ratingFieldHidden: true
    }

    this.toggleHidden = this.toggleHidden.bind(this)
  }

  toggleHidden(sortField, priorValue) {
    const nextValue = !priorValue
    if (sortField == 'Type') {
      this.setState({
        typeFieldHidden: nextValue,
        genreFieldHidden: true,
        ratingFieldHidden: true
      })
    }
    else if (sortField == 'Genre') {
      this.setState({
        typeFieldHidden: true,
        genreFieldHidden: nextValue,
        ratingFieldHidden: true
      })
    }
    else {
      this.setState({
        typeFieldHidden: true,
        genreFieldHidden: true,
        ratingFieldHidden: nextValue
      })
    }
  }

  render() {
    const dropdownComponents = sortBarOptions.map((sortOption) => {
      const hiddenStateKey = `${sortOption.field.toLowerCase()}FieldHidden`
      return(
        <SortDropdown
          key={sortOption.key}
          sortField={sortOption.field}
          options={sortOption.options}
          sortMedia={this.props.sortMedia}
          hidden={this.state[hiddenStateKey]}
          toggleHidden={this.toggleHidden}
        />
      )
    })

    return(
      <div className="sort-div">
        <ul className="sort-bar">
          {dropdownComponents}
        </ul>
        <p className="sort-result-message">{this.props.sortMessage}</p>
      </div>
    )
  }
}

export default SortBar
