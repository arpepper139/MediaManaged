import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import FlashNotice from '../components/FlashNotice'
import MainPage from '../components/MainPage'
import AddMediaPrompt from '../components/AddMediaPrompt'

class MediaIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: [],
      loaded: false
    }

    this.clearFlash = this.clearFlash.bind(this)
    this.sortMedia = this.sortMedia.bind(this)
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
        media: body.user.media,
        loaded: true
      })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    });
  }

  clearFlash() {
    browserHistory.replace({
        pathname: '/',
        state: null
    })
  }

  sortMedia(param) {
    debugger
  }

  render() {
    let flashNotice, displayComponent
    if (this.props.location.state) {
      flashNotice =
        <FlashNotice
          message={this.props.location.state.message}
          clearFlash={this.clearFlash}
        />
    }

    if (this.state.media.length !== 0) {
      displayComponent =
        <MainPage
          media={this.state.media}
          sortMedia={this.sortMedia}
        />
    }
    else if (this.state.media.length === 0 && this.state.loaded === true){
      displayComponent = <AddMediaPrompt />
    }

    return(
      <div>
        {flashNotice}
        {displayComponent}
      </div>
    )
  }
}

export default MediaIndexContainer
