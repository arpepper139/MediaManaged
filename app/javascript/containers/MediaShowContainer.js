import React, { Component } from 'react'

import MediaInfoTile from '../components/MediaInfoTile'

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
        let type = `${path.includes("movie") ? "movie" : "show"}`
        this.setState({
          media: body[type],
          type: type
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let mediaTile;

    if (Object.keys(this.state.media).length !== 0) {
      mediaTile =
        <MediaInfoTile
          type={this.state.type}
          data={this.state.media}
        />
    }

    return(
      <div className="showpage">
        {mediaTile}
      </div>
    )
  }
}

export default MediaShowContainer
