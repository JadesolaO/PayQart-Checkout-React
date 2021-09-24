import React, { useEffect, useState } from "react"
import CreditForm from "./CreditForm"

import "../stylesheets/css/creditapplicationscreen.css"
import { useAppContext } from "../utils/contexts/AppContext"
import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"
import { useHistory } from "react-router-dom"

const ContactDetails = ({
  setPage,
  setContactdone,
  checkDone,
  startPayment
}) => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    address: "",
    residentialtype: "",
    livingduration: "",
    telephone: "",
    city: "",
    state: ""
  })
  // eslint-disable-next-line no-unused-vars
  const [readOnly, setReadOnly] = useState(false)
  const [loading, setLoading] = useState(Boolean)

  const { userDetails } = useAppContext()

  let history = useHistory()

  const orderId = localStorage.getItem("orderId")

  useEffect(() => {
    const contactInfoObj = JSON.parse(localStorage.getItem("contactInfoObj"))

    if (contactInfoObj !== null) {
      const {
        phoneNumber,
        email,
        homeAddress,
        city,
        state,
        residenceType,
        yearsOfResidence
      } = contactInfoObj
      setContactInfo({
        email,
        address: homeAddress,
        residentialtype: residenceType,
        livingduration: yearsOfResidence,
        telephone: phoneNumber,
        city,
        state
      })

      setContactdone(true)
    }
  }, [setContactdone])

  const handleChange = (name, e) => {
    const value = e.target.value

    let newValue

    if (name === "telephone") {
      newValue = Number(e.target.value.replace(/\D/g, "")) || ""
    } else {
      newValue = value
    }

    setContactInfo({
      ...contactInfo,
      email: userDetails.email,
      [name]: newValue
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const creditId = localStorage.getItem("creditId")
    const contactInfoObj = {
      creditId,
      phoneNumber: Number(userDetails.telephone).toString().replace(/^0+/, ""),
      email: contactInfo.email,
      homeAddress: contactInfo.address,
      city: contactInfo.city,
      state: contactInfo.state,
      residenceType: contactInfo.residentialtype,
      yearsOfResidence: contactInfo.livingduration
    }

    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        `${apiEndpoint}/application/info/contact`,
        contactInfoObj,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // console.log(response)

      const { data } = response
      if (data.status === "success") {
        history.push(`/${orderId}/creditapplication/employment`)
        localStorage.setItem("contactInfoObj", JSON.stringify(contactInfoObj))
        setContactdone(true)
        setLoading(false)
      }
    } catch (error) {
      console.log(error.response)
      setLoading(false)
      if (
        error.response.data.message ===
        "Authorization Failed, please login to continue"
      ) {
        history.push("/signin")
      }
    }
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Telephone Number",
            type: "text",
            value: userDetails.telephone.replace(/^0+/, ""),
            name: "telephone",
            handleChange: handleChange,
            disabled: true
          },
          {
            label: "Email Address",
            type: "email",
            value: userDetails.email,
            name: "email",
            readOnly: { readOnly },
            disabled: true,
            handleChange: handleChange
          }
        ]}
        formDetails2={[
          {
            label: "Home Address",
            type: "text",
            value: contactInfo.address,
            name: "address",
            handleChange: handleChange,
            className: "single-frm"
          }
        ]}
        formDetails3={[
          {
            label: "City",
            type: "text",
            value: contactInfo.city,
            name: "city",
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
            value: contactInfo.state,
            name: "state",
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: "Residence Type",
            type: "select",
            options: ["Select", "Owned", "Rented", "Employer Provided"],
            value: contactInfo.residentialtype,
            name: "residentialtype",
            handleChange: handleChange
          },
          {
            label: "Years Of Residence",
            type: "select",
            options: [
              "Select",
              "Less than 6 months",
              "Between 6 months - 1 year",
              "1-2 years",
              "2-3 years",
              "3 years and above"
            ],
            value: contactInfo.livingduration,
            name: "livingduration",
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

export default ContactDetails
