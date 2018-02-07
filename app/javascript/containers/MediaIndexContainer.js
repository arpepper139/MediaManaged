import React, { Component } from 'react'

import MediaPreview from '../components/MediaPreview'

class MediaIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      firstName: null,
      lastName: null,
      media: [],
      loggedIn: null
    }
  }

  componentDidMount() {
    fetch('/api/v1/users/current.json', { credentials: 'same-origin' })
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
      this.setState({
        userId: body.user.id,
        firstName: body.user.first_name,
        lastName: body.user.last_name,
        media: body.user.media,
        loggedIn: true
      })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
      this.setState({loggedIn: false})
    });
  }

  render() {
    let media = this.state.media
    let loggedIn = this.state.loggedIn

    let returnedJSX
    let topPreviewTiles
    let bottomPreviewTiles

    if (media.length !== 0) {
      let key = 0
      let mediaPreviewTiles = media.slice(0, 12).map((media_object) => {
        key++

        let type
        if (media_object.director) {
          type = "movie"
        }
        else {
          type = "show"
        }

        return(
          <MediaPreview
            key={key}
            id={media_object.id}
            name={media_object.name}
            poster={media_object.poster.url}
            type={type}
          />
        )
      })

      topPreviewTiles = mediaPreviewTiles.slice(0, 6)
      bottomPreviewTiles = mediaPreviewTiles.slice(6, 12)
    }

    if (loggedIn === false) {
      returnedJSX = <h1 className="greeting">Welcome to Media Managed! Please sign up or sign in to keep track of all your shows and movies.</h1>
    }
    else {
      returnedJSX =
        <div className="main-col small-12 large-12 columns">
          <div>{ topPreviewTiles }</div>
          <div>{ bottomPreviewTiles }</div>
        </div>
    }

    return(
      <div className="homepage">
        {returnedJSX}
      </div>
    )
  }
}

export default MediaIndexContainer
