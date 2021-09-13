import React, { useEffect, useState } from "react"
import CreditForm from "./CreditForm"

import "../stylesheets/css/creditapplicationscreen.css"
import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"
import { useHistory } from "react-router-dom"

const EmploymentInformation = ({
  setPage,
  setEmploymentdone,
  checkDone,
  startPayment
}) => {
  const [employmentInfo, setEmploymentInfo] = useState({
    employername: "",
    employeraddress: "",
    workduration: "",
    employmenttype: "",
    designation: "",
    employmentmode: "",
    city: "",
    state: ""
  })
  const [loading, setLoading] = useState(Boolean)

  let history = useHistory()

  useEffect(() => {
    const employmentInfoObj = JSON.parse(
      localStorage.getItem("employmentInfoObj")
    )

    if (employmentInfoObj !== null) {
      setEmploymentdone(true)
      const {
        employmentType,
        businessName,
        designation,
        businessType,
        businessAddress,
        businessSector,
        businessCity,
        businessState,
        yearsOfEmployment,
        employmentMode,
        employerName,
        employerAddress,
        employerCity,
        employerState
      } = employmentInfoObj
      if (employmentType === 1) {
        setEmploymentInfo({
          employername: employerName,
          employeraddress: employerAddress,
          workduration: yearsOfEmployment,
          employmenttype: "Salary Earner",
          designation: designation,
          employmentmode: employmentMode,
          city: employerCity,
          state: employerState
        })
      } else {
        setEmploymentInfo({
          employername: businessName,
          employeraddress: businessAddress,
          workduration: businessType,
          employmenttype: "Self Employed",
          designation: designation,
          employmentmode: businessSector,
          city: businessCity,
          state: businessState
        })
      }
    }
  }, [setEmploymentdone])

  const handleChange = (name, e) => {
    if (name === "employmenttype") {
      return setEmploymentInfo({
        employername: "",
        employeraddress: "",
        workduration: "",
        employmenttype: e.target.value,
        designation: "",
        employmentmode: "",
        city: "",
        state: ""
      })
    }
    setEmploymentInfo({ ...employmentInfo, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let employmentInfoObj

    const creditId = localStorage.getItem("creditId")

    if (employmentInfo.employmenttype === "Salary Earner") {
      employmentInfoObj = {
        creditId,
        employmentType: 1, //1-salary earner  2-selfemployed
        businessName: null,
        designation: employmentInfo.designation,
        businessType: null,
        businessAddress: null,
        businessSector: null,
        businessCity: null,
        businessState: null,
        yearsOfEmployment: employmentInfo.workduration, //null if employmenttype is 2
        employmentMode: employmentInfo.employmentmode, //null if employmenttype is 2
        employerName: employmentInfo.employername, //null if employmenttype is 2
        employerAddress: employmentInfo.employeraddress, //null if employmenttype is 2
        employerCity: employmentInfo.city, //null if employmenttype is 2
        employerState: employmentInfo.state //null if employmenttype is 2
      }
    } else {
      employmentInfoObj = {
        creditId,
        employmentType: 2, //1-salary earner  2-selfemployed
        businessName: employmentInfo.employername,
        designation: employmentInfo.designation,
        businessType: employmentInfo.workduration,
        businessAddress: employmentInfo.employeraddress,
        businessSector: employmentInfo.employmentmode,
        businessCity: employmentInfo.city,
        businessState: employmentInfo.state,
        yearsOfEmployment: null, //null if employmenttype is 2
        employmentMode: null, //null if employmenttype is 2
        employerName: null, //null if employmenttype is 2
        employerAddress: null, //null if employmenttype is 2
        employerCity: null, //null if employmenttype is 2
        employerState: null //null if employmenttype is 2
      }
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `${apiEndpoint}/application/info/employment`,
        employmentInfoObj,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const { data } = response

      if (data.status === "success") {
        setLoading(false)
        setEmploymentdone(true)
        history.push("/creditapplication/bank")
        localStorage.setItem(
          "employmentInfoObj",
          JSON.stringify(employmentInfoObj)
        )
      }
    } catch (error) {
      console.log(error.response)
      setLoading(false)
    }
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Employment Type",
            type: "select",
            options: ["Select", "Salary Earner", "Self Employed"],
            value: employmentInfo.employmenttype,
            name: "employmenttype",
            handleChange: handleChange
          },
          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "Employer's Name",
                type: "text",
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Business Name",
                type: "text",
                // change value and name to business name
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Self Employed"
            ? {
                label: "Business Name",
                type: "text",
                // change value and name to business name
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
            : {
                label: "Employer's Name",
                type: "text",
                value: employmentInfo.employername,
                name: "employername",
                handleChange: handleChange
              }
        ]}
        formDetails2={[
          {
            label: "Designation",
            type: "text",
            value: employmentInfo.designation,
            name: "designation",
            handleChange: handleChange
          },
          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "How Long Have You Worked Here?",
                type: "select",
                options: [
                  "Select",
                  "Less than 6 months",
                  "Between 6 months - 1 year",
                  "1-2 years",
                  "2-3 years",
                  "3 years and above"
                ],
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Business Type",
                type: "select",
                options: [
                  "Select",
                  "Business Name",
                  "Limited Liability",
                  "Unregistered"
                ],
                // change value
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Self Employed"
            ? {
                label: "Business Type",
                type: "select",
                options: [
                  "Select",
                  "Business Name",
                  "Limited Liability",
                  "Unregistered"
                ],
                // change value
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
            : {
                label: "How Long Have You Worked Here?",
                type: "select",
                options: [
                  "Select",
                  "Less than 6 months",
                  "Between 6 months - 1 year",
                  "1-2 years",
                  "2-3 years",
                  "3 years and above"
                ],
                value: employmentInfo.workduration,
                name: "workduration",
                handleChange: handleChange
              }
        ]}
        formDetails3={[
          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "Employer's Address",
                type: "text",
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Business Address",
                type: "text",
                // change
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Self Employed"
            ? {
                label: "Business Address",
                type: "text",
                // change
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              }
            : {
                label: "Employer's Address",
                type: "text",
                value: employmentInfo.employeraddress,
                name: "employeraddress",
                handleChange: handleChange
              },

          employmentInfo.employmenttype === "Salary Earner"
            ? {
                label: "Employment Mode",
                type: "select",
                options: ["Select", "Full Time", "Part Time", "Contract"],
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Select"
            ? {
                label: "Employment Mode",
                type: "select",
                options: ["Select", "Full Time", "Part Time", "Contract"],
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
            : employmentInfo.employmenttype === "Business Owner"
            ? {
                label: "Sector",
                type: "text",
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
            : {
                label: "Sector",
                type: "text",
                value: employmentInfo.employmentmode,
                name: "employmentmode",
                handleChange: handleChange
              }
        ]}
        formDetails4={[
          {
            label: "City",
            type: "text",
            value: employmentInfo.city,
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
            value: employmentInfo.state,
            name: "state",
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

export default EmploymentInformation
