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
      sortMessage: '',
      slicePoint1: 0,
      slicePoint2: 12
    }

    this.clearRouterFlash = this.clearRouterFlash.bind(this)
    this.sortMedia = this.sortMedia.bind(this)
    this.pageFlip = this.pageFlip.bind(this)
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
        this.setState({ sortMessage: "No matches found" })
      }
      else {
        this.setState({
          media: body.results,
          slicePoint1: 0,
          slicePoint2: 12,
          sortMessage: ''
        })
      }
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`)
    });
  }

  pageFlip(value) {
    event.preventDefault()
    let flip = (value === "right" ? 12 : -12)

    let currentSlice1 = this.state.slicePoint1
    let currentSlice2 = this.state.slicePoint2

    this.setState({
      slicePoint1: currentSlice1 + flip,
      slicePoint2: currentSlice2 + flip
    })
  }

  render() {
    let flashNotice,
    header,
    headerClass,
    displayComponent

    if (this.props.location.state) {
      flashNotice =
        <FlashNotice
          message={this.props.location.state.message}
          clearFlash={this.clearRouterFlash}
        />
    }

    if (this.state.media.length !== 0) {
      displayComponent =
        <MainPage
          media={this.state.media}
          pageFlip={this.pageFlip}
          slicePoint1={this.state.slicePoint1}
          slicePoint2={this.state.slicePoint2}
          sortMedia={this.sortMedia}
          sortMessage={this.state.sortMessage}
        />

      header = "Explore your personal video collection!"
      headerClass="media-greeting"
    }
    else if (this.state.media.length === 0 && this.state.loaded === true) {
      displayComponent = <AddMediaPrompt />
      header = "Create your personal video collection!"
      headerClass="no-media-greeting"
    }

    return(
      <div>
        {flashNotice}
        <h1 className={headerClass}>{header}</h1>
        {displayComponent}
      </div>
    )
  }
}

export default MediaIndexContainer
