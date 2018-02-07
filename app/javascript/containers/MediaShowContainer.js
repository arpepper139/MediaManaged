import React, { Component } from 'react'

import MovieShowTile from '../components/MovieShowTile'
import ShowShowTile from '../components/ShowShowTile'

class MediaShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: {},
      type: null
    }
  }

  componentDidMount() {
    let path = this.props.location.pathname
    fetch(`/api/v1/${path}.json`, { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        return response.json()
      })
      .then(body => {
        let type
        if (path.includes("movie")) {
          type = "movie"
        }
        else {
          type = "show"
        }

        this.setState({
          media: body[type],
          type: type
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let type = this.state.type
    let renderedJSX;

    if (Object.keys(this.state.media).length !== 0) {
      if (type === "movie") {
        renderedJSX =
          <MovieShowTile
            data={ this.state.media }
          />
      }
      else {
        renderedJSX =
          <ShowShowTile
            data={ this.state.media }
          />
      }
    }

    return(
      <div className="showpage">
        {renderedJSX}
      </div>
    )
  }
}

export default MediaShowContainer
