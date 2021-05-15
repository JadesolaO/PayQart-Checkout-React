import React from 'react'
import { Col, Form, Row, Container, Button, InputGroup, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import eye from '../images/Path 38.png'

const SignInScreen = (props) => {
  return (
   <div className='signup'>
      <div className="topsection">
        <Link to="/"><i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i> Back</Link>
      </div>

      <Row className='justify-content-md-center text-center'>
        <Col md={8}>
          <div className="suform">
            <h3
              style={{
                color: '#720056',
                textAlign: 'center'
              }}>
              Sign In To Payqart
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
                <Form.Group>
                  <InputGroup className='inputgroup_'>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className='form-control_'
                    />
                    <span><Image src={eye} fluid /></span>
                  </InputGroup>
                </Form.Group>

                <p className="text-center sitxt">Don't have an account? <Link to='/'>Proceed to check eligibility.</Link></p>


                <div className="check">
                  <Form.Group>
                    <Form.Label>
                      <Form.Check
                        type='checkbox'
                        label=""
                        className='form-check-inline checker'
                        name='existingLoans'
                        value=''
                      // onChange={(e) => setExistingLoan(e.target.value)}
                      />
                      <span
                        style={{
                          color: '#720056',
                          fontSize: "13px",
                          fontWeight: "bold",
                          position: "absolute",
                          left: "30px",
                        }}
                      >
                        Remember Sign In Details.
                      </span>

                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <Form.Check
                        type='checkbox'
                        label=""
                        className='form-check-inline checker'
                        name='existingLoans'
                        value=''
                      // onChange={(e) => setExistingLoan(e.target.value)}
                      />
                      <span
                        style={{
                          color: '#720056',
                          fontSize: "13px",
                          fontWeight: "bold",
                          // position: "absolute",
                          left: "23px",
                        }}
                      >
                        I am over 22years and I have read and agree to PayQart's Terms and Condtions. I agree that the information are accurate and can be verified by PayQart.
                      </span>

                    </Form.Label>
                  </Form.Group>

                  <div className="forgotpass">
                    <Link to='/forgotpassword'>Forgot Password?</Link>
                  </div>

                </div>
                <div className="contdbtn">
                  <Button
                    id='btmbtn'
                    onClick={() => props.history.push('/creditscreen')}
                  >
                    Sign In
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

export default SignInScreen
