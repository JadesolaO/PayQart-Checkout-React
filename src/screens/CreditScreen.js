/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import { ProgressSteps, ProgressStepsFunded } from "../components/ProgressSteps"
import "../stylesheets/css/creditscreen.css"
import { getLoanStat } from "../services/creditFormService"
import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"

const CreditScreen = (props) => {
  const [loanStatus, setLoanStatus] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showPaymentBreakdown, updateShowPaymentBreakdown] = useState(false)

  const [startingApplication, updateStartingApplication] = useState(false)

  const { orderId } = useParams()

  let history = useHistory()

  useEffect(() => {
    getLoanStatus()
  }, [])

  const getLoanStatus = () => {
    const loanid = localStorage.getItem("loanId")
    if (!loanid) {
      localStorage.setItem("nextRoute", "/creditapplication")
      return setLoading(false)
    }
    getLoanStat(loanid)
      .then((res) => {
        setLoading(false)
        if (!res.data || res.data.incomedetails !== "submitted")
          return localStorage.setItem("nextRoute", "/creditapplication")
        setLoanStatus(true)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const startApplicationHandler = async () => {
    // if (loanStatus) return props.history.push("/creditapplication")
    updateStartingApplication(true)
    const selection = localStorage.getItem("selection")
    if (selection === "wallet-not-funded") {
      const startApplicationObj = JSON.parse(
        localStorage.getItem("startApplicationObj")
      )

      try {
        const token = localStorage.getItem("token")

        const response = await axios.post(
          `${apiEndpoint}/application/external/start`,
          startApplicationObj,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const { data } = response

        console.log(data)

        if (data.status === "success") {
          localStorage.setItem("creditId", data.data.creditId)
          localStorage.removeItem("startApplicationObj")
          localStorage.removeItem("userInfo")
          localStorage.removeItem("nextRoute")

          updateStartingApplication(false)
          props.history.push(`/${orderId}/creditapplication/personal`)
        }
      } catch (error) {
        updateStartingApplication(false)
        if (error) {
          console.log(error.response)
        }
      }
    }
    // props.history.push("/employmentscreen")
  }

  async function makeVerificationPayment() {
    try {
      const response = await axios.post(
        `${apiEndpoint}/utilities/initializePayment`,
        {
          email: "test@email.com"
        }
      )
      const { data } = response
      if (data.status === "success") {
        const authUrl = data.data.authorization_url

        return (window.location.href = authUrl)
      }
      // console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const selection = localStorage.getItem("selection")

  return (
    <div className="creditscreen">
      <div className="topsection">
        <span onClick={() => history.goBack()} style={{ cursor: "pointer" }}>
          <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
          Back
        </span>
      </div>
      <div className="steps">
        {selection === "wallet-funded" ? (
          <ProgressStepsFunded step1 complete />
        ) : (
          <ProgressSteps step1 step2 step3 complete />
        )}
      </div>
      {selection === "wallet-funded" ? (
        <Container fluid>
          {showPaymentBreakdown ? (
            <Row className="justify-content-md-center">
              <Col className="boxes mx-3 mb-3" xs={12} md={6}>
                <div className="text">
                  <p className="mb-2">Wallet Balance</p>
                  <h5 className="mb-2" style={{ fontWeight: "bold" }}>
                    ₦45,000
                  </h5>
                  <p className="text-muted">Expires in 29 days</p>
                </div>
              </Col>
              <Col className="boxes mx-3 mb-3" xs={12} md={6}>
                <div className="text">
                  <p className="mb-2">Available Shopping Credit</p>
                  <h5 className="mb-2" style={{ fontWeight: "bold" }}>
                    ₦23,800
                  </h5>
                  {showPaymentBreakdown ? (
                    <p className="text-muted">Successfully applied!</p>
                  ) : (
                    <p className="text-muted">Approved Tenor: 5 months</p>
                  )}
                </div>
              </Col>
              <div className="mt-5">
                <h3 className="text-center mb-3">Payment Breakdown</h3>
                <Row
                  className="border p-4 mx-auto rounded-3 justify-content-md-center"
                  style={{ width: "90%" }}
                >
                  <Col className="border-0 mb-3" xs={12} md={6}>
                    <div className="text">
                      <p className="mb-1">TOTAL CART VALUE</p>
                      <h5 className="" style={{ fontWeight: "bold" }}>
                        ₦45,000
                      </h5>
                    </div>
                  </Col>
                  <Col className="border-0 mb-3" xs={12} md={6}>
                    <div className="text">
                      <p className="mb-1">DOWN PAYMENT</p>
                      <h5 className="" style={{ fontWeight: "bold" }}>
                        ₦23,800
                      </h5>
                    </div>
                  </Col>
                  <Col className="border-0" xs={12} md={6}>
                    <div className="text">
                      <p className="mb-1">MONTHLY INSTALLMENT</p>
                      <h5 className="" style={{ fontWeight: "bold" }}>
                        ₦45,000
                      </h5>
                    </div>
                  </Col>
                  <Col className="border-0" xs={12} md={6}>
                    <div className="text">
                      <p className="mb-1">TENOR</p>
                      <h5 className="" style={{ fontWeight: "bold" }}>
                        ₦23,800
                      </h5>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="apply-button mt-5 text-center">
                <Button size="lg" onClick={makeVerificationPayment}>
                  Make Down Payment
                </Button>
              </div>
            </Row>
          ) : (
            <Row className="justify-content-md-center">
              <Col className="boxes mx-3 mb-3" xs={12} md={6}>
                <div className="text">
                  <p className="mb-2">Wallet Balance</p>
                  <h5 className="mb-2" style={{ fontWeight: "bold" }}>
                    ₦45,000
                  </h5>
                  <p className="text-muted">Expires in 29 days</p>
                </div>
              </Col>
              <Col className="boxes mx-3 mb-3" xs={12} md={6}>
                <div className="text">
                  <p className="mb-2">Available Shopping Credit</p>
                  <h5 className="mb-2" style={{ fontWeight: "bold" }}>
                    ₦23,800
                  </h5>
                  <p className="text-muted">Approved Tenor: 5 months</p>
                </div>
              </Col>
              <div className="apply-button my-3 text-center">
                <Button
                  size="lg"
                  disabled={loading}
                  onClick={() => updateShowPaymentBreakdown(true)}
                >
                  Apply For Shopping Credit
                </Button>
              </div>
            </Row>
          )}
        </Container>
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col className="boxes mx-3 mb-3" xs={12} md={6}>
              <div className="text">
                <p className="mb-2">Wallet Balance</p>
                <h5 className="mb-2">₦0.00</h5>
                {/* <p className="text-muted">Expires in 29 days</p> */}
              </div>
            </Col>
            <Col className="boxes mx-3 mb-3" xs={12} md={6}>
              <div className="text">
                <p className="mb-2">Available Shopping Credit</p>
                <h5 className="mb-2">₦0.00</h5>
                {/* <p className="text-muted">Approved Tenor: 5 months</p> */}
              </div>
            </Col>
            <div className="apply-button my-3 text-center">
              <Button
                size="lg"
                disabled={startingApplication}
                onClick={startApplicationHandler}
              >
                Apply For Shopping Credit
              </Button>
            </div>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default CreditScreen
