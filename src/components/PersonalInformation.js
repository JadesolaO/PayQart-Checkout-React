/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import CreditForm from "./CreditForm"

import "../stylesheets/css/creditapplicationscreen.css"
import { useAppContext } from "../utils/contexts/AppContext"

import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"

import { useHistory, useParams } from "react-router-dom"

const PersonalInformation = ({
  setPage,
  setPersonaldone,
  checkDone,
  startPayment
}) => {
  const [personalInfo, setPersonalInfo] = useState({
    title: "",
    gender: "",
    firstname: "",
    lastname: "",
    middlename: "",
    maritalstatus: "",
    educationlevel: "",
    children: "",
    bvn: "",
    dob: ""
  })
  const [readOnly, setReadOnly] = useState(false)
  const [loading, setLoading] = useState(Boolean)

  const { userDetails } = useAppContext()

  let history = useHistory()

  const orderId = localStorage.getItem("orderId")

  useEffect(() => {
    const personalInfoObj = JSON.parse(localStorage.getItem("personalInfoObj"))

    if (personalInfoObj !== null) {
      setPersonalInfo({
        title: personalInfoObj.title,
        gender: personalInfoObj.gender,
        firstname: personalInfoObj.firstName,
        lastname: personalInfoObj.lastName,
        middlename: personalInfoObj.middleName,
        maritalstatus: personalInfoObj.maritalStatus,
        educationlevel: personalInfoObj.educationLevel,
        children: personalInfoObj.numberOfChildren,
        bvn: personalInfoObj.bvn,
        dob: personalInfoObj.dob
      })

      setPersonaldone(true)
    }
  }, [setPersonaldone])

  const handleChange = (name, e) => {
    setPersonalInfo({
      ...personalInfo,
      bvn: userDetails.bvn,
      [name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const creditId = localStorage.getItem("creditId")

    const personalInfoObj = {
      creditId,
      title: personalInfo.title,
      firstName: userDetails.firstname,
      middleName: personalInfo.middlename,
      lastName: userDetails.lastname,
      gender: personalInfo.gender,
      maritalStatus: personalInfo.maritalstatus,
      educationLevel: personalInfo.educationlevel,
      numberOfChildren: personalInfo.children,
      bvn: personalInfo.bvn,
      dob: personalInfo.dob
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `${apiEndpoint}/application/info/personal`,
        personalInfoObj,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const { data } = response

      if (data.status === "success") {
        setLoading(false)
        localStorage.setItem("personalInfoObj", JSON.stringify(personalInfoObj))
        history.push(`/${orderId}/creditapplication/contact`)
        setPersonaldone(true)
      }
    } catch (error) {
      console.log(error.response)
      setLoading(false)
      if (
        error.response.data.message ===
        "Authorization Failed, please login to continue"
      ) {
        history.push("/signin/1")
      }
    }
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Title",
            type: "select",
            options: ["Select", "Dr", "Mrs", "Mr", "Miss", "Prof"],
            value: personalInfo.title,
            name: "title",
            readOnly: { readOnly },
            handleChange: handleChange
          },
          {
            label: "First Name",
            type: "text",
            value: userDetails.firstname,
            name: "firstname",
            readOnly: { readOnly },
            disabled: true,
            handleChange: handleChange
          }
        ]}
        formDetails2={[
          {
            label: "Middle Name",
            type: "text",
            value: personalInfo.middlename,
            name: "middlename",
            readOnly: { readOnly },
            handleChange: handleChange
          },
          {
            label: "Last Name",
            type: "text",
            value: userDetails.lastname,
            name: "lastname",
            readOnly: { readOnly },
            disabled: true,
            handleChange: handleChange
          }
        ]}
        formDetails3={[
          {
            label: "Gender",
            type: "select",
            options: ["Select", "Female", "Male"],
            value: personalInfo.gender,
            name: "gender",
            readOnly: { readOnly },
            handleChange: handleChange
          },
          {
            label: "Marital Status",
            type: "select",
            options: ["Select", "Single", "Married", "Widowed", "Divorced"],
            value: personalInfo.maritalstatus,
            name: "maritalstatus",
            handleChange: handleChange
          }
        ]}
        formDetails4={[
          {
            label: "Education Level",
            type: "select",
            options: [
              "Select",
              "WAEC",
              "BSc",
              "Msc",
              "PHD",
              "OND",
              "HND",
              "Others"
            ],
            value: personalInfo.educationlevel,
            name: "educationlevel",
            handleChange: handleChange
          },
          {
            label: "Number Of Children/Dependants",
            type: "select",
            options: [
              "Select",
              "1-3 people",
              "3-7 people",
              "8-12 people",
              "Above 12 people",
              "None"
            ],
            value: personalInfo.children,
            name: "children",
            handleChange: handleChange
          }
        ]}
        formDetails5={[
          {
            label: "Bank Verification Number",
            type: "number",
            value: userDetails.bvn,
            name: "bvn",
            readOnly: { readOnly },
            disabled: true,
            handleChange: handleChange
          },
          {
            label: "Date Of Birth",
            type: "date",
            value: personalInfo.dob,
            name: "dob",
            readOnly: { readOnly },
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

export default PersonalInformation
