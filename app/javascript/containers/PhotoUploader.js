import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class PhotoUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

    this.readFile = this.readFile.bind(this)
    this.postPhoto = this.postPhoto.bind(this)
  }

  readFile(selectorFiles: FileList) {
    if (selectorFiles && selectorFiles[0]) {
      let formPayload = new FormData();
      formPayload.append('poster', selectorFiles[0]);
      this.postPhoto(formPayload)
    }
  }

  postPhoto(formPayload) {
    console.log(formPayload)
    let id = this.props.id
    let type = this.props.type

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
      debugger
    })
    .catch(error => console.error(`Error in fetch patch: ${error.message}`))
  }

  render() {
    return(
      <div className="dropzone">
        <Dropzone onDrop={this.readFile}>
          <button>Upload a new image</button>
        </Dropzone>
      </div>
    )
  }
}

export default PhotoUploader
