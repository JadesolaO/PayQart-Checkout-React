import React from 'react'
import { Row, Col, Form, Button, Container, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProgressSteps from '../components/ProgressSteps'
import '../stylesheets/scss/planscreen.scss'

const PlanScreen = (props) => {
  return (
    <div className="planScreen">
      <div className="topsection">
        <Link to="/"><i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i> Back</Link>
      </div>
      <div className="steps">
      <ProgressSteps step1 complete/>
      </div>
      <Row className='justify-content-md-center'>
        <Col>
          <div className="plans">
            <h3
              style={{
                color: '#720056',
                textAlign: 'center'
              }}>
              Choose Your Plan
            </h3>
            <Container fluid>
              <Row>
                <Col className='boxz' tabIndex="1" md={2} xs={3}>
                  <h5>
                    1 month
                </h5>
                  <p>
                    High
                </p>
                </Col>
                <Col className='boxz' tabIndex="2" md={2} xs={3}>
                  <h5>
                    2 months
                </h5>
                  <p>
                    Agressive
                </p>
                </Col>
                <Col className='boxz' tabIndex="3" md={2} xs={3}>
                  <h5>
                    3 months
                </h5>
                  <p>
                    Stretching
                </p>
                </Col>
                <Col className='boxz' tabIndex="4" md={2} xs={3}>
                  <h5>
                    4 months
                </h5>
                  <p>
                    Fair
                </p>
                </Col>
                <Col className='boxz' tabIndex="5" md={2} xs={3}>
                  <h5>
                    5 months
                </h5>
                  <p>
                    Good
                </p>
                </Col>
                <Col className='boxz' tabIndex="6" md={2} xs={3}>
                  <h5>
                    6 months
                </h5>
                  <p>
                    Great
                </p>
                </Col>
              </Row>
              <Row className='text-center infotext'>
                <p>Based on your information provided, this is a healthy plan for you. The payback period and the downpayment option is just about right</p>
              </Row>
            </Container>
            <Row className='justify-content-md-center text-center mt-5'>
              <h3 style={{
                color: '#720056',
              }}>
                Payment Breakdown
              </h3>
              <div className="paymentbreakdown">
                <Container fluid>
                  <Row className='justify-content-md-center '>
                    <Col className='brkdwn' md={8}>
                      <Row className='bkdn py-2 justify-content-md-center'>
                        <Row className='sumry'>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Shopping Credit</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>₦50000</p></Col>
                        </Row>
                        <Row className=''>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Down Payment</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>₦50000</p></Col>
                        </Row>
                        <Row className=''>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Monthly Installment</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>₦50000</p></Col>
                        </Row>
                        <Row className=''>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Tenure</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>₦50000</p></Col>
                        </Row>
                      </Row>
                    </Col>

                    <Col className='customside' md={4}>
                      <span>Customize Down Payment</span>
                      <Row className='justify-content-md-center '>
                        <Col md={9} xs={6} lg={9}>
                          <Form className='frmctn'>
                            <Form.Group>
                              <InputGroup>
                                <InputGroup.Prepend>
                                  <InputGroup.Text id="inputGroupPrepend2">
                                    <span className='inputicon'>₦</span>
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  type="text"
                                  className="frm"
                                  // value={downPayment}
                                  // onChange={(e) => setDownPayment(e.target.value)}
                                  required
                                />
                              </InputGroup>
                            </Form.Group>
                            <div className="subbtn text-center mx-auto">
                              <Button
                                style={{
                                  border: "2px solid #fff",
                                  width: "100%",
                                  borderRadius: "7px",
                                }}
                                type="submit"
                                variant='outline-success'
                                id='sub-btn'
                              >
                                <span className='uptbtn'>Update</span>
                              </Button>
                            </div>
                          </Form>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
          <div className='btmbtn text-center mx-auto'>
            <Button
              id='btmbtn'
              onClick={() => props.history.push('/signup')}
            >
              Continue
            </Button>
          </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PlanScreen
