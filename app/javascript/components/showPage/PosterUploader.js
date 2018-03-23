import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

const PosterUploader = ({ uploader }) => {

 const readFile = (selectorFiles: FileList) => {
   if (selectorFiles && selectorFiles[0]) {
     let formPayload = new FormData();
     formPayload.append('poster', selectorFiles[0]);
     uploader(formPayload)
   }
 }

 return(
   <div className="dropzone">
     <Dropzone
       accept="image/jpeg, image/jpg, image/png"
       maxSize={8000000}
       multiple={false}
       onDrop={readFile}
     >
       <p>Add a poster!</p>
     </Dropzone>
   </div>
 )
}

export default PosterUploader
