import React, { useState } from "react"
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap"
import InputField from "../components/InputField"
import "../stylesheets/css/employementscreen.css"
import paid from "../images/image 4.png"
import free from "../images/image 5.png"
import coop from "../images/image 6.png"
import { ProgressSteps } from "../components/ProgressSteps"
import { useParams, useHistory } from "react-router-dom"

const EmploymentScreen = (props) => {
  const [employmentType, setEmploymentType] = useState("")
  const [show, setShow] = useState(false)
  const [existingLoan, setExistingLoan] = useState(false)
  const [payDate, setPayDate] = useState(new Date())
  const [salary, setSalary] = useState("")
  const [monthlyExpense, setMonthlyExpense] = useState("")
  const [loanAmount, setLoanAmount] = useState("")

  const [payDay, setPayDay] = useState("")

  const dateValue = payDate.toDateString()

  const { orderId } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        income: Number(salary.split(",").join("")),
        monthlyExpense: Number(monthlyExpense.split(",").join("")),
        loanAmount: Number(loanAmount.split(",").join("")),
        employmentType,
        payDay
      })
    )
    props.history.push(`/${orderId}/planscreen`)
  }

  const selection = localStorage.getItem("selection")

  let history = useHistory()

  return (
    <div className="pager">
      <Container className="position-relative" fluid>
        <div
          className="topsection position-absolute top-0 mt-4"
          style={{ zIndex: "500" }}
        >
          {selection !== "wallet-not-funded" && (
            <span
              onClick={() => history.goBack()}
              style={{ cursor: "pointer" }}
            >
              <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
              Back
            </span>
          )}
        </div>

        <div className="stps">
          {selection === "wallet-funded" ? (
            <ProgressSteps step1 step2 complete />
          ) : (
            <ProgressSteps />
          )}
        </div>
        <Row className="justify-content-md-center f-row w-100">
          <Col md={9} xs={12}>
            <h5 id="occu-text" className="text-center my-3">
              Select Your Employment Type
            </h5>
            <Row className="justify-content-md-center mb-4">
              <Col
                className={
                  employmentType === "paid-employment"
                    ? "mx-3 boxs col-p options-border"
                    : "mx-3 boxs col-p"
                }
                md={3}
              >
                <div
                  className="options"
                  tabIndex="1"
                  onClick={() => setEmploymentType("paid-employment")}
                >
                  <div>
                    <Image fluid src={paid} />
                  </div>
                  <span
                    className="imgtxt w-100"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Paid Employment
                  </span>
                </div>
              </Col>

              <Col
                className={
                  employmentType === "self-employment"
                    ? "mx-3 boxs col-p options-border"
                    : "mx-3 boxs col-p"
                }
                md={3}
              >
                <div
                  className="options"
                  tabIndex="2"
                  onClick={() => setEmploymentType("self-employment")}
                >
                  <div>
                    <Image fluid src={free} />
                  </div>
                  <span className="imgtxt" style={{ fontSize: "0.75rem" }}>
                    Self Employed/ Freelance
                  </span>
                </div>
              </Col>

              <Col
                className={
                  employmentType === "corporate-organisation"
                    ? "mx-3 boxs col-p options-border"
                    : "mx-3 boxs col-p"
                }
                md={3}
              >
                <div
                  className="options"
                  tabIndex="3"
                  onClick={() => setEmploymentType("corporate-organisation")}
                >
                  <div>
                    <Image fluid src={coop} />
                  </div>
                  <span className="imgtxt" style={{ fontSize: "0.75rem" }}>
                    Small Business
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="formdiv" md={8} xs={12}>
            <Form onSubmit={handleSubmit}>
              {employmentType === "paid-employment" && (
                <Row>
                  <InputField
                    label1="How much do you get paid monthly?"
                    employmentType={employmentType}
                    existingLoan={existingLoan}
                    setExistingLoan={setExistingLoan}
                    show={show}
                    setShow={setShow}
                    value1={salary}
                    setValue1={setSalary}
                    value2={payDate}
                    setValue2={setPayDate}
                    dateValue={dateValue}
                    value3={loanAmount}
                    setValue3={setLoanAmount}
                    setPayDay={setPayDay}
                  />
                </Row>
              )}
              {employmentType === "corporate-organisation" && (
                <Row>
                  <InputField
                    label1="What is your average monthly revenue?"
                    label2="What is your average monthly expense?"
                    existingLoan={existingLoan}
                    setExistingLoan={setExistingLoan}
                    show={show}
                    setShow={setShow}
                    value1={salary}
                    setValue1={setSalary}
                    value2={monthlyExpense}
                    setValue2={setMonthlyExpense}
                    value3={loanAmount}
                    setValue3={setLoanAmount}
                  />
                </Row>
              )}
              {employmentType === "self-employment" && (
                <Row>
                  <InputField
                    label1="What is your average monthly revenue?"
                    label2="What is your average monthly expense?"
                    existingLoan={existingLoan}
                    setExistingLoan={setExistingLoan}
                    show={show}
                    setShow={setShow}
                    value1={salary}
                    setValue1={setSalary}
                    value2={monthlyExpense}
                    setValue2={setMonthlyExpense}
                    value3={loanAmount}
                    setValue3={setLoanAmount}
                  />
                </Row>
              )}

              <div className="continuebutton text-center">
                <Button
                  type="submit"
                  id="bottombutton"
                  // onClick={() => props.history.push('/planscreen')}
                  disabled={employmentType === ""}
                >
                  Continue
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EmploymentScreen
