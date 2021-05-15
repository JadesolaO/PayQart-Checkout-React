import React from 'react'
import { Col, Form, Row, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ForgotPasswordScreen = () => {
  return (
    <div className='signup'>
      <div className="topsection">
        <Link to="/signin"><i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i> Back</Link>
      </div>

      <Row className='justify-content-md-center text-center'>
        <Col md={8}>
          <div className="suform">
            <h3
              style={{
                color: '#720056',
                textAlign: 'center'
              }}>
              Reset Password
            </h3>

            <Container fluid>
              <Form className='form_'>                
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    className='form-control_'
                  />
                </Form.Group>
                <div className="contdbtn">
                  <Button
                    id='btmbtn'
                  >
                    Reset Password
                    </Button>
                </div>
              </Form>
            </Container>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPasswordScreen
