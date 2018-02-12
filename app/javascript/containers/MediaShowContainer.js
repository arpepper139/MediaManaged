import React, { Component } from 'react'

import FlashNotice from '../components/FlashNotice'
import MediaInfoTile from '../components/MediaInfoTile'

class MediaShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: {},
      type: null,
      message: ''
    }

    this.clearFlash = this.clearFlash.bind(this)
    this.grabMessage = this.grabMessage.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
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

  clearFlash() {
    this.setState({ message: '' })
  }

  grabMessage(message) {
    this.setState({ message: message })
  }

  render() {
    let mediaTile, flashNotice

    if (this.state.message !== '') {
      flashNotice =
        <FlashNotice
          message={this.state.message}
          clearFlash={this.clearFlash}
        />
    }

    if (Object.keys(this.state.media).length !== 0) {
      mediaTile =
        <MediaInfoTile
          type={this.state.type}
          data={this.state.media}
          passMessage={this.grabMessage}
          fetchData={this.fetchData}
        />
    }

    return(
      <div>
        {flashNotice}
        <div className="showpage">
          {mediaTile}
        </div>
      </div>
    )
  }
}

export default MediaShowContainer
