import React, { useState } from "react"
import CreditForm from "./CreditForm"

import "../stylesheets/css/creditapplicationscreen.css"
import { useAppContext } from "../utils/contexts/AppContext"

const ContactDetails = ({ setPage, setContactdone }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(contactInfo)

    localStorage.setItem("contactInfo", JSON.stringify(contactInfo))
    setPage("employmentInfo")
    setContactdone(true)
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Telephone Number",
            type: "text",
            value: contactInfo.telephone,
            name: "telephone",
            handleChange: handleChange
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
        handleSubmit={handleSubmit}
        buttonText="Continue"
        loading={loading}
      />
    </div>
  )
}

export default ContactDetails
