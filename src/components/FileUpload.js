import React from 'react'
import { Image } from 'react-bootstrap'
import upload from '../images/upload.svg'
import '../stylesheets/scss/fileupload.scss'

const FileUpload = (props) => {
  return (
    <div class="fileUpload text-center">
      <p><strong>{props.name}</strong></p>
      <input type="file" id="actual-btn" hidden />
      <label className='lablef' for="actual-btn"><Image fluid src={upload} />  Upload</label>
    </div>
  )
}

export default FileUpload
