import React from 'react'
import { Form } from 'react-bootstrap'
import '../stylesheets/scss/fileupload.scss'

const FileUpload = () => {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.File />
        </Form.Group>
      </Form>
    </div>
  )
}

export default FileUpload
