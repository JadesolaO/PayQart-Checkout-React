import React from 'react'
import { Col, Form, Row, Container, Button, InputGroup, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import eye from '../images/Path 38.png'
import lock from '../images/Path 44.png'
import '../stylesheets/scss/SignUpScreen.scss'

const SignUpScreen = () => {
  return (
    <div className='signup'>
      <div className="topsection">
        <Link to="/planscreen"><i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i> Back</Link>
      </div>

      <Row className='justify-content-md-center text-center'>
        <Col md={8}>
          <div className="suform">
            <h3
              style={{
                color: '#720056',
                textAlign: 'center'
              }}>
              Create A PayQart Account
            </h3>

            <Container fluid>
              <Form className='form_ mb-2'>
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
                    <span style={{top: '15px'}}><Image src={eye} fluid /></span>
                    {/* <InputGroup.Append>
                      <InputGroup.Text ClassName='iconright'>
                        <Image src={eye} fluid />
                      </InputGroup.Text>
                    </InputGroup.Append> */}
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <InputGroup className='inputgroup_'>
                  <Form.Control
                    type="text"
                    placeholder="Bank Verification Number"
                    className='form-control_'
                  />
                  <span><Image src={lock} fluid /></span>
                  </InputGroup>
                </Form.Group>

                <p className="text-center sitxt">Got an account? <Link to='/signin'>Sign In.</Link></p>


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
                          // position: "absolute",
                          left: "23px",
                          top: "-10px"
                        }}
                      >
                        I am over 22years and I have read and agree to PayQart's Terms and Condtions. I agree that the information are accurate and can be verified by PayQart.
                      </span>
                      

                    </Form.Label>
                  </Form.Group>
                </div>

                <div className="mid"></div>
                <div className="contdbtn">
                  <Button
                    id='btmbtn'
                  >
                    Create Account
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

export default SignUpScreen
