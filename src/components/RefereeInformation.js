import React, { useEffect, useState } from "react"
import CreditForm from "./CreditForm"
import {
  successToast,
  submitReferenceInfo,
  getLoanDetails
} from "../services/creditFormService"
import "../stylesheets/css/creditapplicationscreen.css"

const RefereeInformation = ({ startPayment, setRefdone }) => {
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

  const handleChange = (name, e) => {
    setReferenceInfo({ ...referenceInfo, [name]: e.target.value })
  }

  useEffect(() => {
    retrieveLoanDetails()
  }, [])

  const retrieveLoanDetails = async () => {
    const user = JSON.parse(localStorage.getItem("userObjFromBckEnd"))
    if (!user || user.newUser) return

    await getLoanDetails()
      .then((res) => {
        if (!res.data) return
        let loanInfo = (({
          rname,
          rtelephone,
          remail,
          raddress,
          rrelationship,
          rcity,
          rstate
        }) => ({
          rname,
          rtelephone,
          remail,
          raddress,
          rrelationship,
          rcity,
          rstate
        }))(res.data)
        const names = loanInfo.rname.split(" ")
        delete loanInfo.rname
        loanInfo.rfirstName = names[0]
        loanInfo.rlastName = names[1]
        setReferenceInfo(loanInfo)
      })
      .catch(() => {})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    let newReferenceObj = (({
      rname,
      rtelephone,
      remail,
      raddress,
      rrelationship,
      rcity,
      rstate
    }) => ({
      rname,
      rtelephone,
      remail,
      raddress,
      rrelationship,
      rcity,
      rstate
    }))(referenceInfo)
    newReferenceObj.rname =
      referenceInfo.rfirstName + " " + referenceInfo.rlastName
    submitReferenceInfo(newReferenceObj)
      .then((res) => {
        successToast(res.data)
        setRefdone(true)
        startPayment()
        setLoading(false)
      })
      .catch(() => {})
    // return history.push("/success")
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
        handleSubmit={handleSubmit}
        buttonText="Pay Verification Fee"
        loading={loading}
      />
    </div>
  )
}

export default RefereeInformation
