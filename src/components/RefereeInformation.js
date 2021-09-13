import React, { useEffect, useState } from "react"
import CreditForm from "./CreditForm"

import "../stylesheets/css/creditapplicationscreen.css"
import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"

const RefereeInformation = ({ startPayment, setRefdone, checkDone }) => {
  const [referenceInfo, setReferenceInfo] = useState({
    rname: "",
    rfirstName: "",
    rlastName: "",
    rtelephone: "",
    remail: "",
    raddress: "",
    rrelationship: "",
    rcity: "",
    rstate: ""
  })
  const [loading, setLoading] = useState(Boolean)

  useEffect(() => {
    const refereeInfoObj = JSON.parse(localStorage.getItem("refereeInfoObj"))

    if (refereeInfoObj !== null) {
      const {
        refereeFirstName,
        refereeLastName,
        refereeEmail,
        refereePhoneNumber,
        refereeRelationship,
        refereeAddress,
        refereeCity,
        refereeState
      } = refereeInfoObj

      setReferenceInfo({
        rname: "",
        rfirstName: refereeFirstName,
        rlastName: refereeLastName,
        rtelephone: refereePhoneNumber,
        remail: refereeEmail,
        raddress: refereeAddress,
        rrelationship: refereeRelationship,
        rcity: refereeCity,
        rstate: refereeState
      })
    }
  }, [])

  const handleChange = (name, e) => {
    const value = e.target.value

    let newValue

    if (name === "rtelephone") {
      newValue = Number(e.target.value.replace(/\D/g, "")) || ""
    } else {
      newValue = value
    }
    setReferenceInfo({ ...referenceInfo, [name]: newValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const creditId = localStorage.getItem("creditId")

    const refereeInfoObj = {
      creditId,
      refereeFirstName: referenceInfo.rfirstName,
      refereeLastName: referenceInfo.rlastName,
      refereeEmail: referenceInfo.remail,
      refereePhoneNumber: referenceInfo.rtelephone.toString(),
      refereeRelationship: referenceInfo.rrelationship,
      refereeAddress: referenceInfo.raddress,
      refereeCity: referenceInfo.rcity,
      refereeState: referenceInfo.rstate
    }

    // console.log(refereeInfoObj)

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `${apiEndpoint}/application/info/referee`,
        refereeInfoObj,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const { data } = response

      if (data.status === "success") {
        setLoading(false)
        setRefdone(true)
        localStorage.setItem("refereeInfoObj", JSON.stringify(refereeInfoObj))
      }
    } catch (error) {
      setLoading(false)
      console.log(error.response)
    }
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "First Name",
            type: "text",
            value: referenceInfo.rfirstName,
            name: "rfirstName",
            handleChange: handleChange
          },
          {
            label: "Last Name",
            type: "text",
            value: referenceInfo.rlastName,
            name: "rlastName",
            handleChange: handleChange
          }
        ]}
        formDetails2={[
          {
            label: "Email Address",
            type: "email",
            value: referenceInfo.remail,
            name: "remail",
            handleChange: handleChange
          },
          {
            label: "Telephone Number",
            type: "number",
            value: referenceInfo.rtelephone,
            name: "rtelephone",
            handleChange: handleChange
          }
        ]}
        formDetails3={[
          {
            label: "Relationship",
            type: "select",
            options: [
              "Select",
              "Colleague",
              "Friend",
              "Spouse",
              "Sibling",
              "Parent"
            ],
            value: referenceInfo.rrelationship,
            name: "rrelationship",
            handleChange: handleChange
          },
          {
            label: "Residential Address",
            type: "text",
            value: referenceInfo.raddress,
            name: "raddress",
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: "City",
            type: "text",
            value: referenceInfo.rcity,
            name: "rcity",
            handleChange: handleChange
          },
          {
            label: "State",
            type: "select",
            options: [
              "Select",
              "Abia",
              "Adamawa",
              "Akwa Ibom",
              "Anambra",
              "Bauchi",
              "Bayelsa",
              "Benue",
              "Borno",
              "Cross River",
              "Delta",
              "Ebonyi",
              "Edo",
              "Ekiti",
              "Enugu",
              "FCT - Abuja",
              "Gombe",
              "Imo",
              "Jigawa",
              "Kaduna",
              "Kano",
              "Katsina",
              "Kebbi",
              "Kogi",
              "Kwara",
              "Lagos",
              "Nasarawa",
              "Niger",
              "Ogun",
              "Ondo",
              "Osun",
              "Oyo",
              "Plateau",
              "Rivers",
              "Sokoto",
              "Taraba",
              "Yobe",
              "Zamfara"
            ],
            value: referenceInfo.rstate,
            name: "rstate",
            handleChange: handleChange
          }
        ]}
        handleSubmit={checkDone() ? startPayment : handleSubmit}
        buttonText={checkDone() ? "Pay Verification Fee" : "Continue"}
        loading={loading}
      />
    </div>
  )
}

export default RefereeInformation
