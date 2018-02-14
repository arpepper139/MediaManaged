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
      loaded: false,
      message: ''
    }

    this.clearRouterFlash = this.clearRouterFlash.bind(this)
    this.clearSortFlash = this.clearSortFlash.bind(this)
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

  clearRouterFlash() {
    browserHistory.replace({
        pathname: '/',
        state: null
    })
  }

  clearSortFlash() {
    this.setState({ message: ''})
  }

  sortMedia(option, param) {
    fetch(`/api/v1/sort/${option}?return=${param}`, { credentials: 'same-origin' })
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
      if (body.results === "Nothing Found") {
        this.setState({ message: "No matches found" })
      }
      else {
        this.setState({
          media: body.results,
          message: ''
        })
      }
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    });
  }

  render() {
    console.log(this.state)
    let flashNotice, displayComponent, action
    if (this.props.location.state) {
      flashNotice =
        <FlashNotice
          message={this.props.location.state.message}
          clearFlash={this.clearRouterFlash}
        />
    }
    else if (this.state.message !== '') {
      flashNotice =
        <FlashNotice
          message={this.state.message}
          clearFlash={this.clearSortFlash}
        />
    }

    if (this.state.media.length !== 0) {
      displayComponent =
        <MainPage
          media={this.state.media}
          sortMedia={this.sortMedia}
        />

      action = "Explore"
    }
    else if (this.state.media.length === 0 && this.state.loaded === true){
      displayComponent = <AddMediaPrompt />
      action = "Create"
    }

    return(
      <div>
        {flashNotice}
        <h1 className="homepage-greeting">{action} your personal video collection!</h1>
        {displayComponent}
      </div>
    )
  }
}

export default MediaIndexContainer
