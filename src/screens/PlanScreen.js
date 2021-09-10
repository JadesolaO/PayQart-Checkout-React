/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Row, Col, Form, Button, Container, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ProgressSteps } from "../components/ProgressSteps"
import "../stylesheets/css/planscreen.css"
import { setStatus } from "../services/Formulae"
import Message from "../components/Message"
// import { inititiateCredit } from "../services/creditFormService"
import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"

const PlanScreen = (props) => {
  const data = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {}
  // console.log(data)

  const [plans, setPlans] = useState([])
  const [cartValue, setCartValue] = useState(80500)
  const [downPayment, setDownPayment] = useState(cartValue * 0.3)
  const [payInfo, setPayInfo] = useState({})
  const [tenure, setTenure] = useState("")
  const [tenureNum, setTenureNum] = useState(Number)
  const [monthlyRepay, setMonthlyRepay] = useState([])
  const [updatedDownPayment, setUpdatedDownPayment] = useState("")
  const [info, setInfo] = useState({})
  const [monthlyAmount, setMonthlyAmount] = useState(Number)
  const [textString, setTextString] = useState(String)
  const [error, setError] = useState("")
  const [showBreakdown, setShowBreakdown] = useState(Boolean)

  const [shoppingCredit, setShoppingCredit] = useState("")

  const [monthlyRepayment, setMonthlyRepayment] = useState(null)
  const [totalRepayment, setTotalRepayment] = useState(null)
  // const [downPayment, setDownPayment] = useState(null)

  const [netIncome, setNetIncome] = useState("")

  const [startingApplication, updateStartingApplication] = useState(false)

  const [loadingPlan, updateLoadingPlan] = useState(false)

  const [calculating, updateCalculating] = useState(false)

  useEffect(() => {
    let monthsArray = []

    for (let i = 0; i < arrayOfStatuses.length; i++) {
      monthsArray.push({
        id: i + 1,
        monthlyRepayment: monthlyRepay[i],
        text: arrayOfStatuses[0].status,
        description: arrayOfStatuses[0].description
      })
    }

    setPlans(monthsArray)
  }, [monthlyRepay])

  const formSubmit = (e) => {
    e.preventDefault()
    // alert("True")
    setError("")
    if (Number(updatedDownPayment.split(",").join("")) < cartValue * 0.3) {
      setError(
        `Down Payment cannot be lower than 30% of cart value (${
          cartValue * 0.3
        })`
      )
      return
    }
    if (Number(updatedDownPayment.split(",").join("")) > cartValue) {
      setError(`Down Payment cannot be greater than cart value (${cartValue})`)
      return
    }
    setDownPayment(Number(updatedDownPayment.split(",").join("")))
    planHandler(
      "updateDownPayment",
      Number(updatedDownPayment.split(",").join(""))
    )
  }

  // async function initiateCreditApplication() {
  //   const selection = localStorage.getItem("selection")

  //   if (selection === "wallet-not-funded") {
  //     return props.history.push("/signin/1")
  //   }

  //   props.history.push("/creditapplication")
  // }

  async function planHandler(type, value) {
    updateCalculating(true)
    let obj

    if (type === "tenor") {
      obj = {
        requestedAmount: cartValue - downPayment,
        tenor: Number(value),
        employmentType: data.employmentType === "paid-employment" ? 1 : 2,
        userSalaryDate:
          data.employmentType === "paid-employment"
            ? Number(data.payDay)
            : null,
        userMonthlyPay:
          data.employmentType === "paid-employment" ? data.income : null,
        averageMonthlyRevenue:
          data.employmentType !== "paid-employment" ? data.income : null, //null if employmenttype is 1
        averageMonthlyExpense:
          data.employmentType !== "paid-employment"
            ? data.monthlyExpense
            : null,
        currentMonthlyLoan: data.loanAmount === 0 ? null : data.loanAmount
      }
    } else {
      obj = {
        requestedAmount: cartValue - Number(value),
        tenor: Number(tenureNum),
        employmentType: data.employmentType === "paid-employment" ? 1 : 2,
        userSalaryDate:
          data.employmentType === "paid-employment"
            ? Number(data.payDay)
            : null,
        userMonthlyPay:
          data.employmentType === "paid-employment" ? data.income : null,
        averageMonthlyRevenue:
          data.employmentType !== "paid-employment" ? data.income : null, //null if employmenttype is 1
        averageMonthlyExpense:
          data.employmentType !== "paid-employment"
            ? data.monthlyExpense
            : null,
        currentMonthlyLoan: data.loanAmount === 0 ? null : data.loanAmount
      }
    }

    console.log(obj)

    try {
      const response = await axios.post(
        `${apiEndpoint}/application/calculate`,
        obj
      )

      const { data } = response

      // console.log(data)

      if (data.status === "success") {
        updateLoadingPlan(false)
        if (type === "tenor") {
          setTenureNum(value)
        }
        setShoppingCredit(data["Approved Shopping Credit"])
        setMonthlyRepayment(data["Monthly Repayment"])
        setTotalRepayment(data["Total Repayment"])
        setNetIncome(data["Monthly Net Income"])
        // setDownPayment(data["Down Payment"])

        let monthsArray = []
        let textString = ""
        let repay

        for (let i = 0; i < arrayOfStatuses.length; i++) {
          if (data.DTI < 16) {
            monthsArray.push({
              id: i + 1,
              monthlyRepayment: monthlyRepay[i],
              text: arrayOfStatuses[i].status,
              description: arrayOfStatuses[i].description
            })
          } else if (data.DTI < 26) {
            monthsArray.push({
              id: i + 1,
              monthlyRepayment: monthlyRepay[i],
              text: arrayOfStatuses[i].status,
              description: arrayOfStatuses[i].description
            })
          } else if (data.DTI < 36) {
            monthsArray.push({
              id: i + 1,
              monthlyRepayment: monthlyRepay[i],
              text: arrayOfStatuses[i].status,
              description: arrayOfStatuses[i].description
            })
          } else if (data.DTI < 41) {
            monthsArray.push({
              id: i + 1,
              monthlyRepayment: monthlyRepay[i],
              text: arrayOfStatuses[i].status,
              description: arrayOfStatuses[i].description
            })
          } else if (data.DTI < 46) {
            monthsArray.push({
              id: i + 1,
              monthlyRepayment: monthlyRepay[i],
              text: arrayOfStatuses[i].status,
              description: arrayOfStatuses[i].description
            })
          } else {
            monthsArray.push({
              id: i + 1,
              monthlyRepayment: monthlyRepay[i],
              text: arrayOfStatuses[i].status,
              description: arrayOfStatuses[i].description
            })
          }
        }

        setPlans(monthsArray)

        if (type === "tenor") {
          textString = monthsArray[Number(value) - 1]?.description
          repay = monthsArray[Number(value) - 1]?.monthlyRepayment
          setTenure(
            `${Number(value) > 1 ? `${value} months` : `${value} month`}`
          )
          setTenureNum(Number(value))
          setMonthlyAmount(monthsArray[Number(value) - 1].monthlyRepayment)
          setTextString(textString)
          setMonthlyAmount(repay)
        }

        setShowBreakdown(true)

        updateCalculating(false)
      }
    } catch (error) {
      console.log(error)
      updateCalculating(false)
      updateLoadingPlan(false)
    }
  }

  async function startApplication() {
    const startApplicationObj = {
      requestedAmount: Number(shoppingCredit),

      type: 2,

      currentMonthlyLoan: data.loanAmount === 0 ? null : data.loanAmount,

      userSalaryDate:
        data.employmentType === "paid-employment" ? data.payDay : null,

      averageMonthlyRevenue:
        data.employmentType !== "paid-employment" ? data.income : null, //null if employmenttype is 1
      averageMonthlyExpense:
        data.employmentType !== "paid-employment" ? data.monthlyExpense : null, //null if employmenttype is 1

      employmentType: data.employmentType === "paid-employment" ? 1 : 2, // 1-salaryearner 2-entrepreneur

      userMonthlyPay:
        data.employmentType === "paid-employment" ? data.income : null,

      tenor: Number(tenureNum),
      products: [
        {
          productName: "Nike Boots",
          quantity: 1,
          price: 30500
        },
        {
          productName: "Tecno phone",
          quantity: 1,
          price: 50000
        }
      ],
      onlineStores: [
        {
          onlineStoreName: "Jumia",
          productUrl: "https://hjsdhskjdbsjdjsnkdsjskdn"
        }
      ],
      storeType: "online",
      inStoreName: null,
      inStoreAddress: null,
      inStoreEmail: null,
      inStoreContactPerson: null,
      inStorePhoneNumber: null,
      invoice: null,
      monthlyNetIncome: Number(netIncome),
      shoppingCredit: Number(shoppingCredit),
      monthlyRepayment: Number(monthlyRepayment),
      totalRepayment: Number(totalRepayment),
      downPayment: Number(downPayment)
    }

    localStorage.setItem(
      "startApplicationObj",
      JSON.stringify(startApplicationObj)
    )

    const selection = localStorage.getItem("selection")

    if (selection === "wallet-not-funded") {
      return props.history.push("/signin/1")
    }

    props.history.push("/creditapplication")
  }

  const selection = JSON.stringify(localStorage.getItem("selection"))

  // console.log(selection)

  return (
    <div className="planScreen">
      <div className="topsection position-absolute top-0 mt-5">
        <Link
          to={
            selection !== "wallet-not-funded"
              ? "/employmentscreen"
              : "/creditscreen"
          }
        >
          <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
          Back
        </Link>
      </div>
      <div className="steps">
        {selection === "wallet-funded" ? (
          <ProgressSteps step1 step2 step3 complete />
        ) : (
          <ProgressSteps step1 complete />
        )}
      </div>
      <Row className="justify-content-md-center">
        <Col>
          <div className="plans">
            <h3
              style={{
                color: "#720056",
                textAlign: "center"
              }}
            >
              Choose Your Plan
            </h3>
            {calculating ? (
              <div className="p-xl-5 mt-lg-5 d-flex align-items-center justify-content-center">
                Loading...
              </div>
            ) : (
              <>
                <Container fluid>
                  <Row>
                    {plans.map((item) => (
                      <Col
                        key={item.id}
                        className={`boxz ${tenureNum === item.id && `focused`}`}
                        tabIndex={`${item.id}`}
                        md={2}
                        xs={3}
                        onClick={() => {
                          planHandler("tenor", item.id)
                        }}
                      >
                        <div className={`top top${item.id}`}></div>
                        <div className="content text-center">
                          <p>{showBreakdown === true && item.text}</p>
                          <h5>{`${item.id}`}</h5>
                          <p>{`${item.id > 1 ? "months" : "month"}`}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Row className="text-center infotext">
                    <p>{showBreakdown === true && textString}</p>
                  </Row>
                </Container>
                <Row className="justify-content-md-center text-center mt-5">
                  {showBreakdown === true && (
                    <h3
                      style={{
                        color: "#720056"
                      }}
                    >
                      Payment Breakdown
                    </h3>
                  )}
                  {showBreakdown === true && (
                    <div className="paymentbreakdown">
                      <Container fluid>
                        {error && (
                          <Message variant="info">
                            {error}{" "}
                            <i
                              style={{ cursor: "pointer" }}
                              onClick={() => setError("")}
                              className="far fa-times-circle"
                            ></i>
                          </Message>
                        )}
                        <Row className="justify-content-md-center">
                          <Col className="brkdwn" md={8}>
                            <Row className="bkdn py-2 justify-content-md-center">
                              <Row className="">
                                <Col md={6} xs={6}>
                                  <p className="bdtxt text-muted">
                                    <b>Down Payment</b>
                                  </p>
                                </Col>
                                <Col className="lbl" md={6} xs={6}>
                                  <p className="lbo">
                                    <b>{`₦ ${downPayment
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}`}</b>
                                  </p>
                                </Col>
                              </Row>
                              <Row className="sumry">
                                <Col md={6} xs={6}>
                                  <p className="bdtxt text-muted">
                                    Shopping Credit
                                  </p>
                                </Col>
                                <Col className="lbl" md={6} xs={6}>
                                  <p className="lbo">{`₦${Number(
                                    shoppingCredit
                                  ).toLocaleString()}`}</p>
                                </Col>
                              </Row>
                              <Row className="">
                                <Col md={6} xs={6}>
                                  <p className="bdtxt text-muted">
                                    Monthly Installment
                                  </p>
                                </Col>
                                <Col className="lbl" md={6} xs={6}>
                                  <p className="lbo">{`₦${Number(
                                    monthlyRepayment
                                  ).toLocaleString()}`}</p>
                                </Col>
                              </Row>
                              <Row className="">
                                <Col md={6} xs={6}>
                                  <p className="bdtxt text-muted">Tenure</p>
                                </Col>
                                <Col className="lbl" md={6} xs={6}>
                                  <p className="lbo">{tenure}</p>
                                </Col>
                              </Row>
                            </Row>
                          </Col>

                          <Col className="customside" md={4}>
                            <span>Customize Down Payment</span>
                            <Row className="justify-content-md-center ">
                              <Col md={9} xs={6} lg={9}>
                                <Form className="frmctn" onSubmit={formSubmit}>
                                  <Form.Group>
                                    <InputGroup>
                                      <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend2">
                                          <span className="inputicon">₦</span>
                                        </InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <Form.Control
                                        type="text"
                                        className="frm"
                                        placeholder={`${(cartValue * 0.3)
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}`}
                                        value={updatedDownPayment}
                                        onChange={(e) => {
                                          const {
                                            target: { value }
                                          } = e
                                          setUpdatedDownPayment(
                                            (
                                              Number(
                                                value.replace(/\D/g, "")
                                              ) || ""
                                            ).toLocaleString()
                                          )
                                          // setUpdatedDownPayment(e.target.value)
                                        }}
                                        required
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                  <div className="subbtn text-center mx-auto">
                                    <Button
                                      style={{
                                        border: "2px solid #fff",
                                        width: "100%",
                                        borderRadius: "7px"
                                      }}
                                      type="submit"
                                      variant="outline-success"
                                      id="sub-btn"
                                      disabled={!updatedDownPayment}
                                    >
                                      <span className="uptbtn">
                                        Update breakdown
                                      </span>
                                    </Button>
                                  </div>
                                </Form>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  )}
                  <div className="btmbtn text-center mx-auto">
                    <Button
                      id="btmbtn"
                      onClick={startApplication}
                      disabled={!showBreakdown}
                    >
                      Continue
                    </Button>
                  </div>
                </Row>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PlanScreen

const arrayOfStatuses = [
  {
    status: "Great",
    description:
      "Based on your information, You will be in excellent financial shape with this payment plan. The payback period and down payment option is perfect for you."
  },
  {
    status: "Good",
    description:
      "Based on your information,this is a healthy payment plan for You. The payback period and down payment option is just about right."
  },
  {
    status: "Fair",
    description:
      "Based on your information,You will still have enough income left over after paying off this purchase. The payback period and down payment option seems ok."
  },
  {
    status: "Stretching",
    description:
      "Based on your information,You will be using much of your income to pay off this purchase.Try to increase your payback period or increase your down payment"
  },
  {
    status: "Aggressive",
    description:
      "Based on your information,your monthly payment with this plan is excessive and your application may be declined. Adjust your payback period or down payment to increase your odds of getting approved."
  },
  {
    status: "High",
    description:
      "We consider the monthly payment under this plan extremely high and your chances of getting this plan approved is slim. We strongly advise that you increase your down payment or payback period."
  }
]
