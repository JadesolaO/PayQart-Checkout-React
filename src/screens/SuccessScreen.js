import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FileUpload from '../components/FileUpload'
import { Image } from 'react-bootstrap'
import upload from '../images/upload.svg'
import '../stylesheets/scss/successScreen.scss'
import { Link } from 'react-router-dom'

const SuccessScreen = (props) => {

  const routeToMono = () => {
    window.location.href = 'https://mono.co/statements/3e5AuEa';
  }

  return (
    <Container className='success' fluid>
      <Row className='justify-content-md-center'>
        <Col md={9}>
          <div className="top-text text-center mb-4">
            <h2 className='mb-3'><strong>Success!</strong></h2>
            <p>Your application has been submitted successfully. <br /> Next Steps, please provide the required documents below:</p>
          </div>
          <Row className="uploadforms text-center justify-content-md-center">
            <p>REQUIRED DOCUMENTS</p>
            <Col md={5} className="file-upload">
              {/* <FileUpload name='Bank Statement' /> */}
              <div className="fileUpload text-center">
                <p><strong>Bank Statement</strong></p>
                <label onClick={routeToMono} className='lablef'><Image fluid src={upload} />  Generate</label>
              </div>
              <FileUpload name='Govt Issued ID' />
              <FileUpload name='Work ID' />
              <FileUpload name='Proof Of Address' />
              <FileUpload name='Passport Photo' />
            </Col>
          </Row>
          <Row className='justify-content-md-center'>
            <Col md={6}>
              <div className="btn-buttons text-center">
                <a href='mailto: '>Send via email</a> <span>Instead?</span>
                <div className="btom-butn text-center mt-5">
                  <Button onClick={() => props.history.push('/')}>Back To Store</Button>
                  <Button>Go To Dashboard</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SuccessScreen
