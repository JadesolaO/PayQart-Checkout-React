import React, { useState, useEffect } from "react"
import { Row, Col, Button } from "react-bootstrap"
import FileUpload from "../components/FileUpload"

import "../stylesheets/css/successScreen.css"

import axios from "axios"

import apiEndpoint from "../utils/apiEndpoint"
import { useAppContext } from "../utils/contexts/AppContext"
import { useLocation } from "react-router-dom"

const SuccessScreen = (props) => {
  const [documentStatus, setDocumentStatus] = useState({
    govtIdSubmitted: 0,
    workIdSubmitted: 0,
    passportPhotoSubmitted: 0,
    proofOfAddressSubmitted: 0
  })

  const { userDetails } = useAppContext()

  const { search } = useLocation()

  useEffect(() => {
    submitApplicationHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function submitApplicationHandler() {
    const token = localStorage.getItem("token")

    const reference = search.split("&")[1].split("=")[1]

    const creditId = localStorage.getItem("creditId")

    try {
      const response = await axios.post(
        `${apiEndpoint}/application/submit`,
        { creditId, reference },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(response)

      const { data } = response

      if (data.status === "success") {
        localStorage.removeItem("creditApplicationObj")
        localStorage.removeItem("nextRoute")
        localStorage.removeItem("orderId")
        localStorage.removeItem("creditId")
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const saveDocument = async (file, type, statusField) => {
    const token = localStorage.getItem("token")

    const creditId = localStorage.getItem("creditId")

    const { authid } = userDetails

    const docFormData = new FormData()

    docFormData.append("file", file)
    docFormData.append("authid", authid)
    docFormData.append("creditId", creditId)
    docFormData.append("type", type)

    try {
      const response = await axios.post(
        `${apiEndpoint}/application/documents/upload`,
        docFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const { data } = response

      if (data.status === "success") {
        handleDocStatus({ ...documentStatus, [statusField]: 1 })
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleDocStatus = (obj) => {
    setDocumentStatus(obj)
  }

  // const routeToMono = () => {
  //   window.location.href = "https://mono.co/statements/3e5AuEa"
  // }

  return (
    <div className="success" fluid>
      <Row className="justify-content-md-center">
        <Col md={9}>
          <div className="top-text text-center mb-4">
            <h2 className="mb-3">
              <strong>Success!</strong>
            </h2>
            <p>
              Your application has been submitted successfully. <br /> Next
              Steps, please provide the required documents below:
            </p>
          </div>
          <Row className="uploadforms text-center justify-content-md-center">
            <p>REQUIRED DOCUMENTS</p>
            <Col md={5} className="file-upload">
              {/* <FileUpload name='Bank Statement' /> */}
              <div className="fileUpload text-center">
                <p>
                  <strong>Bank Statement</strong>
                </p>

                <a
                  href="https://mono.co/statements/3e5AuEa"
                  target="_blank"
                  rel="noreferrer"
                >
                  <label className="lablef">Generate</label>
                </a>
              </div>
              {/* {documentUploadArray.map((obj) => (
                <FileUpload
                  uploadObj={obj}
                  documentStatus={documentStatus}
                  handleDocStatus={handleDocStatus}
                  saveDocument={(file) => saveDocument(file, [obj.name], [obj.statusField])}
                />
              ))} */}
              <FileUpload
                uploadObj={govtID}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(file, 1, [govtID.statusField])
                }
                accept="image/*,.pdf"
              />
              <FileUpload
                uploadObj={workID}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(file, 2, [workID.statusField])
                }
                accept="image/*,.pdf"
              />
              <FileUpload
                uploadObj={proofOfAddress}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(file, 3, [proofOfAddress.statusField])
                }
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <FileUpload
                uploadObj={passportPhoto}
                documentStatus={documentStatus}
                handleDocStatus={handleDocStatus}
                saveDocument={(file) =>
                  saveDocument(file, 4, [passportPhoto.statusField])
                }
                accept="image/*,.pdf"
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <div className="btn-buttons text-center">
                <a href="mailto: ">Send via email</a> <span>Instead?</span>
                <div className="btom-butn text-center mt-5">
                  <Button
                    onClick={() => {
                      props.history.push("/")
                      localStorage.removeItem("creditId")
                    }}
                  >
                    Back To Store
                  </Button>
                  <Button onClick={() => localStorage.removeItem("creditId")}>
                    <a
                      className="text-white"
                      href="https://payqart-shopperweb-demo.netlify.app/signin"
                    >
                      Go To Dashboard
                    </a>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default SuccessScreen

// const documentUploadArray = [
//   { label: 'Govt Issued ID', name: 'govtId', statusField: 'govtIdSubmitted' },
//   { label: 'Work ID', name: 'workId', statusField: 'workIdSubmitted' },
//   { label: 'Proof Of Address', name: 'proofOfAddress', statusField: 'proofOfAddressSubmitted' },
//   { label: 'Passport Photo', name: 'passportPhoto', statusField: 'passportPhotoSubmitted' }
// ];

const govtID = {
  id: "actual-btn-1",
  label: "Govt Issued ID",
  name: "govtId",
  statusField: "govtIdSubmitted"
}
const workID = {
  id: "actual-btn-2",
  label: "Work ID",
  name: "workId",
  statusField: "workIdSubmitted"
}
const proofOfAddress = {
  id: "actual-btn-3",
  label: "Proof Of Address",
  name: "proofOfAddress",
  statusField: "proofOfAddressSubmitted"
}
const passportPhoto = {
  id: "actual-btn-4",
  label: "Passport Photo",
  name: "passportPhoto",
  statusField: "passportPhotoSubmitted"
}
