import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Container, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProgressSteps from '../components/ProgressSteps'
import '../stylesheets/scss/planscreen.scss'
import { employeeDti, setStatus } from '../services/Formulae'
import Message from '../components/Message'

const PlanScreen = (props) => {
  const data = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
  // console.log(data)

  const [plans, setPlans] = useState([])
  const [cartValue, setCartValue] = useState(80500)
  const [downPayment, setDownPayment] = useState(cartValue * 0.3)
  const [payInfo, setPayInfo] = useState({})
  const [tenure, setTenure] = useState('')
  const [tenureNum, setTenureNum] = useState(Number)
  const [monthlyRepay, setMonthlyRepay] = useState([])
  const [updatedDownPayment, setUpdatedDownPayment] = useState('')
  const [info, setInfo] = useState({})
  const [monthlyAmount, setMonthlyAmount] = useState(Number)
  const [textString, setTextString] = useState(String)
  const [error, setError] = useState('')
  console.log(tenure)


  const income = data.income
  const loanAmount = data.loanAmount
  const monthlyExpense = data.monthlyExpense
  const interestRate = 0.04

  console.log(plans)
  console.log(payInfo)
  // console.log('first', setStatus(80500, 100000, 0, 0, 0.04, 30000,))

  useEffect(() => {
    try {
      const info = setStatus(cartValue, income, monthlyExpense, loanAmount, interestRate, downPayment, 4)
      console.log(info)
      setInfo(info)
      setTextString(info.textString)
      setPlans(info.monthsArray)
      setPayInfo(info.data)
      setMonthlyRepay(info.monthlyRepay)
      setTenure(`4 months`)
      setTenureNum(4)
      setMonthlyAmount(info.repay)
    } catch (error) {
      console.log(error)
    }

  }, [downPayment])

  const formSubmit = (e) => {
    e.preventDefault()
    if (updatedDownPayment < cartValue * 0.3) {
      setError(`Down Payment cannot be lower than 30% of cart value (${cartValue * 0.3})`)
      return
    }
    setDownPayment(Number(updatedDownPayment))
  }
  return (
    <div className="planScreen">
      <div className="topsection">
        <Link to="/employmentscreen"><i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i> Back</Link>
      </div>
      <div className="steps">
        <ProgressSteps step1 complete />
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
                {plans.map(item => (
                  <Col key={item.id} className={`boxz ${tenureNum === item.id && `focused`}`} tabIndex={`${item.id}`} md={2} xs={3} onClick={() => {
                    setTenure(`${item.id > 1 ? `${item.id} months` : `${item.id} month`}`)
                    setTenureNum(item.id)
                    setTextString(plans[item.id - 1].description)
                    setMonthlyAmount(plans[item.id - 1].monthlyRepayment)
                  }}>
                    <h5>
                      {`${item.id} ${item.id > 1 ? 'months' : 'month'}`}
                    </h5>
                    <p>
                      {item.text}
                    </p>
                  </Col>
                ))}
              </Row>
              <Row className='text-center infotext'>
                <p>{textString}</p>
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
                  {error && <Message>{error} <i style={{ cursor: 'pointer' }} onClick={() => setError('')} className="far fa-times-circle"></i></Message>}
                  <Row className='justify-content-md-center '>
                    <Col className='brkdwn' md={8}>
                      <Row className='bkdn py-2 justify-content-md-center'>
                        <Row className='sumry'>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Shopping Credit</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>{`₦${payInfo.shoppingCredit ? payInfo.shoppingCredit : ''}`}</p></Col>
                        </Row>
                        <Row className=''>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Down Payment</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>{`₦${downPayment}`}</p></Col>
                        </Row>
                        <Row className=''>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Monthly Installment</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>{`₦${monthlyAmount}`}</p></Col>
                        </Row>
                        <Row className=''>
                          <Col md={6} xs={6}>
                            <p className='bdtxt text-muted'>Tenure</p>
                          </Col>
                          <Col className='lbl' md={6} xs={6}><p className='lbo'>{tenure}</p></Col>
                        </Row>
                      </Row>
                    </Col>

                    <Col className='customside' md={4}>
                      <span>Customize Down Payment</span>
                      <Row className='justify-content-md-center '>
                        <Col md={9} xs={6} lg={9}>
                          <Form className='frmctn' onSubmit={formSubmit}>
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
                                  value={updatedDownPayment}
                                  onChange={(e) => setUpdatedDownPayment(e.target.value)}
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
