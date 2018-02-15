import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class PosterUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.readFile = this.readFile.bind(this)
  }

  readFile(selectorFiles: FileList) {
    if (selectorFiles && selectorFiles[0]) {
      let formPayload = new FormData();
      formPayload.append('poster', selectorFiles[0]);
      this.props.uploader(formPayload)
    }
  }

  render() {
    return(
      <div className="dropzone">
        <Dropzone
          multiple={false}
          onDrop={this.readFile}
          accept="image/jpeg, image/jpg, image/png"
        >
          <button>Upload a new image</button>
        </Dropzone>
      </div>
    )
  }
}

export default PosterUploader
