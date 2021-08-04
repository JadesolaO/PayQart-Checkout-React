/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import CreditForm from "./CreditForm"

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
    const value = e.target.value

    let newValue

    if (name === "rtelephone") {
      newValue = Number(e.target.value.replace(/\D/g, "")) || ""
    } else {
      newValue = value
    }
    setReferenceInfo({ ...referenceInfo, [name]: newValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let employmentInfoObjForm

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const loanObj = JSON.parse(localStorage.getItem("loanObj"))
    const personalInfo = JSON.parse(localStorage.getItem("personalInfo"))
    const contactInfo = JSON.parse(localStorage.getItem("contactInfo"))
    const employmentInfo = JSON.parse(localStorage.getItem("employmentInfo"))
    const bankInfo = JSON.parse(localStorage.getItem("bankInfo"))

    if (employmentInfo.employmenttype === "Salary Earner") {
      employmentInfoObjForm = {
        employmentType: employmentInfo.employmenttype,
        yearsOfEmployment: employmentInfo.workduration,
        designation: employmentInfo.designation,
        employmentMode: employmentInfo.employmentmode,
        employerName: employmentInfo.employername,
        employerAddress: employmentInfo.employeraddress,
        employmentCity: employmentInfo.city,
        employmentState: employmentInfo.state
      }
    } else {
      employmentInfoObjForm = {
        employmentType: employmentInfo.employmenttype,
        businessName: employmentInfo.employername,
        designation: employmentInfo.designation,
        businessType: employmentInfo.workduration,
        businessAddress: employmentInfo.employeraddress,
        businessSector: employmentInfo.employmentmode,
        businessCity: employmentInfo.city,
        businessState: employmentInfo.state
      }
    }

    let employmentInfoObj = {}

    if (userInfo.employmentType === "paid-employment") {
      employmentInfoObj = {
        employmentType: loanObj.typeofbusiness,
        salaryAmount: Number(loanObj.rsalary).toLocaleString(),
        salaryDate: loanObj.rpaydate,
        existingLoans: loanObj.existingloan === "Yes" ? true : false,
        existingLoanAmount:
          loanObj.existingloan === "Yes" ? Number(userInfo.loanAmount) : 0
      }
    }
    if (userInfo.employmentType === "self-employment") {
      employmentInfoObj = {
        employmentType: loanObj.typeofbusiness,
        selfEmploymentRevenue: Number(userInfo.income).toLocaleString(),
        selfEmploymentExpense: Number(userInfo.monthlyExpense).toLocaleString(),
        existingLoans: loanObj.existingloan === "Yes" ? true : false,
        existingLoanAmount: Number(userInfo.loanAmount).toLocaleString()
      }
    }
    if (userInfo.employmentType === "corporate-organisation") {
      employmentInfoObj = {
        employmentType: loanObj.typeofbusiness,
        corporateOrganisationRevenue: Number(userInfo.income).toLocaleString(),
        corporateOrganisationExpense: Number(
          userInfo.monthlyExpense
        ).toLocaleString(),
        existingLoans: loanObj.existingloan === "Yes" ? true : false,
        existingLoanAmount: Number(userInfo.loanAmount).toLocaleString()
      }
    }

    const creditId =
      Math.floor(Math.random() * (9999 - 1111) + 1111).toString() +
      Math.floor(Math.random() * (9999 - 1111) + 1111).toString() +
      "HP"

    localStorage.setItem("creditId", creditId)

    const creditApplicationObj = {
      employmentInfoObj,
      preApprovedCreditObj: {
        creditId,
        creditAmount: loanObj.ramount,
        tenor: loanObj.rduration,
        monthlyRepayment: loanObj.monthlyRepayment,
        totalRepayment: loanObj.monthlyRepayment * loanObj.rduration,
        dti: loanObj.debtincomeratio,
        status: "pending"
      },
      creditApplicationFormObj: {
        personalInfoObj: {
          title: personalInfo.title,
          firstName: personalInfo.firstname,
          middleName: personalInfo.middlename,
          lastName: personalInfo.lastname,
          gender: personalInfo.gender,
          maritalStatus: personalInfo.maritalstatus,
          educationLevel: personalInfo.educationlevel,
          numberOfChildren: personalInfo.children
        },
        contactInfoObj: {
          phoneNumber: contactInfo.telephone,
          email: contactInfo.email,
          homeAddress: contactInfo.address,
          city: contactInfo.city,
          state: contactInfo.state,
          residenceType: contactInfo.residentialtype,
          yearsOfResidence: contactInfo.livingduration
        },
        employmentInfoObj: employmentInfoObjForm,
        bankInfoObj: {
          incomeAccountType: bankInfo.incomeaccounttype,
          incomeBankType: bankInfo.incomebanktype,
          commercialBankName: bankInfo.bankname,
          commercialBankAccountNumber: bankInfo.accountnumber
        },
        refereeInfoObj: {
          refereeFirstName: referenceInfo.rfirstName,
          refereeLastName: referenceInfo.rlastName,
          refereeEmail: referenceInfo.remail,
          refereePhoneNumber: referenceInfo.rtelephone,
          refereeRelationship: referenceInfo.rrelationship,
          refereeAddress: referenceInfo.raddress,
          refereeCity: referenceInfo.rcity,
          refereeState: referenceInfo.rstate
        },
        paymentReference: ""
      }
    }

    setRefdone(true)
    startPayment(creditApplicationObj)

    // submitReferenceInfo(newReferenceObj)
    //   .then((res) => {
    //     successToast(res.data)

    //   })
    //   .catch(() => {})
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
