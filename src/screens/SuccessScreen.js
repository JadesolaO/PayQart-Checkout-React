import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import FileUpload from '../components/FileUpload'
import '../stylesheets/scss/successScreen.scss'

const SuccessScreen = () => {
  return (
    <Container fluid>
      <Row className='justify-content-md-center'>
        <Col md={7}>
          <div className="top-text text-center mb-4">
            <h3 className='mb-3'>Success!</h3>
            <p>Your application has been submitted successfully. <br/> Next Steps, please provide the required documents below:</p>
          </div>
          <div className="uploadforms text-center">
            <p>REQUIRED DOCUMENTS</p>
            <div className="file-upload">
              <FileUpload />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SuccessScreen
