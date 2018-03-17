import React, { Component } from 'react'

import FlashNotice from '../components/FlashNotice'
import MediaInfoTile from '../containers/MediaInfoTile'

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
    this.addPoster = this.addPoster.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const path = this.props.location.pathname
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
        const type = `${path.includes("movie") ? "movie" : "show"}`
        this.setState({
          media: body[type],
          type: type
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addPoster(formPayload) {
    const id = this.state.media.id
    const type = this.state.type

    fetch(`/api/v1/${type}s/${id}.json`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {},
      body: formPayload
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        media: body[type],
        type: type
      })
    })
    .catch(error => console.error(`Error in fetch patch: ${error.message}`))
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
          uploader={this.addPoster}
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
