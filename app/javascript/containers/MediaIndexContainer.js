import React, { Component } from 'react'
import { Link } from 'react-router'

import MediaPreview from '../components/MediaPreview'

class MediaIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      firstName: null,
      lastName: null,
      media: [],
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
        media: body.user.media
      })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    });
  }

  render() {
    let media = this.state.media

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

    return(
      <div className="homepage">
        <div className="main-col small-12 large-12 columns">
          <div>{ topPreviewTiles }</div>
          <div>{ bottomPreviewTiles }</div>
        </div>
        <Link to={'/media/new'}>
          <button className="add-media">Add Media</button>
        </Link>
      </div>
    )
  }
}

export default MediaIndexContainer
