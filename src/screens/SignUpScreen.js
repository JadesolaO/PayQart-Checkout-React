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
import lock from "../images/Path 44.png"
import "../stylesheets/scss/SignUpScreen.css"
import { successToast } from "../services/authService"
import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"
import { useAppContext } from "../utils/contexts/AppContext"

const SignUpScreen = (props) => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [retypedPassword, setRetypedPassword] = useState("")
  const [bvn, setBvn] = useState("")
  const [agree, setAgree] = useState(null)

  const [error, updateError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  const [signingUp, updateSigningUp] = useState(false)

  const { status } = useParams()

  const { setUserDetails } = useAppContext()

  const selection = localStorage.getItem("selection")

  let history = useHistory()

  const orderId = localStorage.getItem("orderId")

  async function signUpUser(e) {
    e.preventDefault()

    updateError(false)
    setErrorMsg("")
    updateSigningUp(true)

    if (password !== retypedPassword) {
      updateError(true)
      setErrorMsg("Passwords do not match")
      updateSigningUp(false)
      return
    }

    const userInfo = {
      email,
      bvn: bvn.toString(),
      telephone: telephone.toString(),
      firstname,
      lastname,
      pin: password
    }

    try {
      const response = await axios.post(`${apiEndpoint}/user/signup`, userInfo)

      const { data } = response

      if (data.status === "success") {
        setUserDetails(data.user)
        localStorage.setItem("token", data.access_token)
        successToast(data.message)
        props.history.push(`/${orderId}/creditscreen`)
        updateSigningUp(false)
        // localStorage.removeItem("orderId")
      }
    } catch (error) {
      if (error.response) {
        updateError(true)

        const msg = error.response.data.message

        let new_element = document.createRange().createContextualFragment(msg)

        console.log(new_element)
        // setErrorMsg(new_element)

        const errorElement = document.getElementById("error-msg")

        errorElement.appendChild(new_element)

        updateSigningUp(false)
      } else {
        updateError(true)
        setErrorMsg(error.message)
        updateSigningUp(false)
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
          <ProgressStepsFunded complete />
        ) : (
          <ProgressSteps step1 step2 complete />
        )}
      </div>
      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <div className="suform mb-3">
            <h3
              style={{
                color: "#720056",
                textAlign: "center"
              }}
            >
              Create A PayQart Account
            </h3>

            <Container fluid>
              <Form className="form_" onSubmit={signUpUser}>
                {error && (
                  <h1
                    id="error-msg"
                    className="text-danger mb-1"
                    style={{ textAlign: "left", fontSize: "0.9rem" }}
                  >
                    {errorMsg}
                  </h1>
                )}
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    className="form-control_"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    className="form-control_"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </Form.Group>

                <div>
                  <InputGroup className="flex">
                    <span className="py-1 mt-2">+234</span>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      className="form-control_"
                      value={telephone}
                      onChange={(e) => {
                        const value = e.target.value
                        setTelephone(Number(value.replace(/\D/g, "")) || "")
                      }}
                      required
                    />
                  </InputGroup>
                </div>

                <Form.Group>
                  <Form.Control
                    type="email"
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
                    <span style={{ top: "15px" }}>
                      <Image src={eye} fluid />
                    </span>
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <InputGroup className="inputgroup_">
                    <Form.Control
                      type="password"
                      placeholder="Retype Password"
                      className="form-control_"
                      value={retypedPassword}
                      onChange={(e) => setRetypedPassword(e.target.value)}
                      required
                    />
                    <span style={{ top: "15px" }}>
                      <Image src={eye} fluid />
                    </span>
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <InputGroup className="inputgroup_">
                    <Form.Control
                      type="text"
                      placeholder="Bank Verification Number"
                      className="form-control_"
                      value={bvn}
                      onChange={(e) => {
                        const value = e.target.value
                        setBvn(Number(value.replace(/\D/g, "")) || "")
                      }}
                      required
                    />
                    <span>
                      <Image src={lock} fluid />
                    </span>
                  </InputGroup>
                </Form.Group>

                <p className="text-center sitxt mb-3">
                  Got an account?{" "}
                  <Link to={{ pathname: `/signin/${status}` }}>Sign In.</Link>
                </p>

                <div className="check">
                  <Form.Group className="d-flex justify-content-center">
                    <Form.Check
                      type="checkbox"
                      label=""
                      className="mt-1"
                      name="Terms"
                      value="agree"
                      onChange={(e) => setAgree(e.target.value)}
                      required
                    />

                    <span
                      style={{
                        color: "#720056",
                        fontSize: "13px",
                        fontWeight: "500",
                        textAlign: "left"
                      }}
                      className="mx-2"
                    >
                      I am over 22years and I have read and agree to PayQart's
                      Terms and Condtions. I agree that the information are
                      accurate and can be verified by PayQart.
                    </span>
                  </Form.Group>
                </div>

                <div className="mid"></div>
                <div className="contdbtn">
                  <Button id="btmbtn" type="submit" disabled={signingUp}>
                    {signingUp ? "Creating Account..." : "Create Account"}
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
