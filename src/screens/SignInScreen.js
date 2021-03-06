/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import {
  Col,
  Form,
  Row,
  Container,
  Button,
  InputGroup,
  Image
} from "react-bootstrap"
import { Link, useParams, useHistory } from "react-router-dom"
import { ProgressSteps, ProgressStepsFunded } from "../components/ProgressSteps"
import eye from "../images/Path 38.png"
import { successToast } from "../services/authService"
import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"
import { useAppContext } from "../utils/contexts/AppContext"
import { scrollParent } from "dom-helpers"

const SignInScreen = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState("")
  const [agree, setAgree] = useState("")

  const [error, updateError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [signingIn, updateSigningIn] = useState(false)

  const { status } = useParams()

  const { setUserDetails } = useAppContext()

  let history = useHistory()

  const selection = localStorage.getItem("selection")

  // const orderId = localStorage.getItem("orderId")

  async function loginUser(e) {
    e.preventDefault()

    updateError(false)
    setErrorMsg("")
    updateSigningIn(true)

    const userInfo = { email, pin: password }

    if (email === "" || password === "") {
      updateSigningIn(false)
      updateError(true)
      setErrorMsg("Email and Password is required")
      return
    }

    try {
      const response = await axios.post(`${apiEndpoint}/user/login`, userInfo)

      const { data } = response

      if (data.status === "success") {
        // console.log(data)
        setUserDetails(data.user)
        localStorage.setItem("token", data.access_token)
        successToast(response.data.message)
        const creditId = localStorage.getItem("creditId")
        const orderId = localStorage.getItem("orderId")
        if (creditId && orderId) {
          props.history.push(`/${orderId}/creditapplication/personal`)
        } else {
          props.history.push(`/${orderId}/creditscreen`)
        }
        updateSigningIn(false)
      }
    } catch (error) {
      if (error.response) {
        updateError(true)
        setErrorMsg(error.response.data.message)
        updateSigningIn(false)
      } else {
        updateError(true)
        setErrorMsg(error.message)
        updateSigningIn(false)
      }
    }
  }

  return (
    <div className="signup">
      <div className="top-section">
        <span onClick={() => history.goBack()} style={{ cursor: "pointer" }}>
          <i style={{ color: "#FF005E" }} className="fas fa-arrow-left"></i>{" "}
          Back
        </span>
      </div>
      <div className="steps s-checks">
        {selection === "wallet-funded" ? (
          <ProgressStepsFunded />
        ) : (
          <ProgressSteps step1 step2 complete />
        )}
      </div>

      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <div className="suform">
            <h3
              style={{
                color: "#720056",
                textAlign: "center"
              }}
            >
              Sign In To Payqart
            </h3>

            <Container fluid>
              <Form className="form_" onSubmit={loginUser}>
                {error && (
                  <h1
                    className="text-danger mb-1"
                    style={{ textAlign: "left", fontSize: "0.9rem" }}
                  >
                    * {errorMsg}
                  </h1>
                )}
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    className="form-control_"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <InputGroup className="inputgroup_">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="form-control_"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span>
                      <Image src={eye} fluid />
                    </span>
                  </InputGroup>
                </Form.Group>

                {status === "1" ? (
                  <p className="text-center sitxt">
                    Don't have an account?{" "}
                    <Link to={{ pathname: `/signup/${status}` }}>Sign Up.</Link>
                  </p>
                ) : (
                  <p className="text-center sitxt">
                    Don't have an account?{" "}
                    <Link to="/eligibityscreen">
                      Proceed to check eligibility.
                    </Link>
                  </p>
                )}

                <div className="forgotpass">
                  <Link to="/forgotpassword">Forgot Password?</Link>
                </div>

                <div className="check my-3">
                  <Form.Group>
                    <Form.Label>
                      <Form.Check
                        type="checkbox"
                        label=""
                        className="form-check-inline checker"
                        name="Details"
                        value="Yes"
                        onChange={(e) => setRemember(e.target.value)}
                      />
                      <span
                        style={{
                          color: "#720056",
                          fontSize: "13px",
                          fontWeight: "bold",
                          position: "absolute",
                          left: "30px"
                        }}
                        className="mx-3"
                      >
                        Remember Sign In Details.
                      </span>
                    </Form.Label>
                  </Form.Group>
                </div>
                <div className="contdbtn">
                  <Button id="btmbtn" type="submit" disabled={signingIn}>
                    {signingIn ? "Signing In..." : "Sign In"}
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
