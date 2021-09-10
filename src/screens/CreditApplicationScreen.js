import React, { useState } from "react"
import { Row, Col, Container, Button, Image } from "react-bootstrap"
import "../stylesheets/css/creditapplicationscreen.css"
import contact from "../images/contact.png"
import mail from "../images/mail.png"
import Union from "../images/Union.png"
import bank from "../images/bank.png"
import ref from "../images/ref.png"
import PersonalInformation from "../components/PersonalInformation"
import ContactDetails from "../components/ContactDetails"
import EmploymentInformation from "../components/EmploymentInformation"
import BankInformation from "../components/BankInformation"
import RefereeInformation from "../components/RefereeInformation"
import { Link } from "react-router-dom"

import axios from "axios"

import apiEndpoint from "../utils/apiEndpoint"
import { useAppContext } from "../utils/contexts/AppContext"

function isDevelopment() {
  if (process.env.NODE_ENV === "development") {
    return true
  } else {
    return false
  }
}

const CreditApplicationScreen = (props) => {
  const [form, setForm] = useState("personalInfo")
  const [personaldone, setPersonaldone] = useState(false)
  const [contactdone, setContactdone] = useState(false)
  const [employmentdone, setEmploymentdone] = useState(false)
  const [bankdone, setBankdone] = useState(false)
  const [refdone, setRefdone] = useState(false)

  const { userDetails } = useAppContext()

  const setPage = (page) => {
    setForm(page)
  }

  function checkDone() {
    if (personaldone && contactdone && employmentdone && bankdone && refdone) {
      return true
    } else {
      return false
    }
  }

  async function startPayment(e) {
    e.preventDefault()

    try {
      const creditId = localStorage.getItem("creditId")

      const { email } = userDetails

      const response = await axios.post(
        `${apiEndpoint}/utilities/initializePayment`,
        {
          email,
          creditId,
          callbackUrl: isDevelopment()
            ? "http://localhost:3000/success"
            : "https://payqart-demo.netlify.app/success"
        }
      )
      const { data } = response
      if (data.status === "success") {
        const authUrl = data.data.authorization_url

        return (window.location.href = authUrl)
      }
      // console.log(response)
    } catch (error) {
      console.log(error.response)
      // if (error) {
      //   updateError(true)
      //   setErrorMsg("Network issue. Try again")
      // }
    }
  }

  const selection = localStorage.getItem("selection")

  return (
    <Container>
      <Row className="justify-content-md-center ">
        <div className="top-sect">
          <Link
            to={
              selection === "wallet-not-funded"
                ? "/creditscreen"
                : "/planscreen"
            }
          >
            <i className="fas fa-arrow-left"></i> Back
          </Link>
        </div>
        <Col className="app-form" md={9} xs={12}>
          <Row className="justify-content-md-center">
            <Col className="side-bar text-center" md={4}>
              <h3 className="my-4">Credit Application Form</h3>
              <div className="side-buttons text-center">
                <div className="side-div text-center">
                  <Button
                    id={`${form === `personalInfo` && `highlighted`}`}
                    // style={form === 'personalInfo' && myStyles}
                    className="side-btn"
                    onClick={() => setForm("personalInfo")}
                  >
                    <Image height="14" src={contact} />{" "}
                    <span>Personal Information</span>
                    {personaldone && (
                      <span style={{ float: "right" }}>
                        <i
                          style={{ color: "#710157" }}
                          className="fa fa-check"
                        ></i>
                      </span>
                    )}
                  </Button>
                </div>
                <div className="side-div">
                  <Button
                    id={`${form === `contactInfo` && `highlighted`}`}
                    className="side-btn"
                    onClick={() => setForm("contactInfo")}
                  >
                    <Image height="14" src={mail} />{" "}
                    <span>Contact Information</span>
                    {contactdone && (
                      <span style={{ float: "right" }}>
                        <i
                          style={{ color: "#710157" }}
                          className="fa fa-check"
                        ></i>
                      </span>
                    )}
                  </Button>
                </div>
                <div className="side-div">
                  <Button
                    id={`${form === `employmentInfo` && `highlighted`}`}
                    className="side-btn"
                    onClick={() => setForm("employmentInfo")}
                  >
                    <Image height="14" src={Union} />{" "}
                    <span>Employment Information</span>
                    {employmentdone && (
                      <span style={{ float: "right" }}>
                        <i
                          style={{ color: "#710157" }}
                          className="fa fa-check"
                        ></i>
                      </span>
                    )}
                  </Button>
                </div>
                <div className="side-div">
                  <Button
                    id={`${form === `bankInfo` && `highlighted`}`}
                    className="side-btn"
                    onClick={() => setForm("bankInfo")}
                  >
                    <Image height="14" src={bank} />{" "}
                    <span>Bank Information</span>
                    {bankdone && (
                      <span style={{ float: "right" }}>
                        <i
                          style={{ color: "#710157" }}
                          className="fa fa-check"
                        ></i>
                      </span>
                    )}
                  </Button>
                </div>
                <div className="side-div">
                  <Button
                    id={`${form === `refInfo` && `highlighted`}`}
                    className="side-btn"
                    onClick={() => setForm("refInfo")}
                  >
                    <Image height="14" src={ref} />{" "}
                    <span>Referee Information</span>
                    {refdone && (
                      <span style={{ float: "right" }}>
                        <i
                          style={{ color: "#710157" }}
                          className="fa fa-check"
                        ></i>
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </Col>
            <Col className="form-sec" md={8}>
              {form === "personalInfo" ? (
                <>
                  <PersonalInformation
                    startPayment={startPayment}
                    setPage={setPage}
                    setPersonaldone={setPersonaldone}
                    checkDone={checkDone}
                  />
                </>
              ) : form === "contactInfo" ? (
                <>
                  <ContactDetails
                    startPayment={startPayment}
                    setPage={setPage}
                    setContactdone={setContactdone}
                    checkDone={checkDone}
                  />
                </>
              ) : form === "employmentInfo" ? (
                <>
                  <EmploymentInformation
                    startPayment={startPayment}
                    setPage={setPage}
                    setEmploymentdone={setEmploymentdone}
                    checkDone={checkDone}
                  />
                </>
              ) : form === "bankInfo" ? (
                <>
                  <BankInformation
                    startPayment={startPayment}
                    setPage={setPage}
                    setBankdone={setBankdone}
                    checkDone={checkDone}
                  />
                </>
              ) : (
                form === "refInfo" && (
                  <>
                    <RefereeInformation
                      startPayment={startPayment}
                      setRefdone={setRefdone}
                      history={props.history}
                      checkDone={checkDone}
                    />
                  </>
                )
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default CreditApplicationScreen
