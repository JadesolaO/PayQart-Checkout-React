import React, { useState, useEffect } from "react"
import CreditForm from "./CreditForm"

import "../stylesheets/css/creditapplicationscreen.css"

import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"

const BankInformation = ({ setPage, setBankdone, checkDone, startPayment }) => {
  const [bankInfo, setBankInfo] = useState({
    incomebanktype: "",
    incomeaccounttype: "",
    bankname: "",
    accountnumber: ""
  })
  const [loading, setLoading] = useState(Boolean)
  const [bankList, setBankList] = useState([])
  const [loadingBanks, updateLoadingBanks] = useState(true)

  useEffect(() => {
    getBanks()
  }, [])

  const handleChange = (name, e) => {
    console.log(name, e.target.value)
    setBankInfo({ ...bankInfo, [name]: e.target.value })
  }

  async function getBanks() {
    try {
      const response = await axios.get(`${apiEndpoint}/utilities/getBanks`)

      const { data } = response

      if (data.status === "success") {
        const responseData = data.data.map((bank) => {
          return { id: bank.code, desc: bank.name }
        })

        updateLoadingBanks(false)
        setBankList(responseData)
      }
    } catch (error) {
      console.log(error.response)
      updateLoadingBanks(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem("token")

    try {
      const response = await axios.post(
        `${apiEndpoint}/utilities/verifyAccountNumber`,
        { bankCode: bankInfo.bankname, accountNumber: bankInfo.accountnumber }
      )

      const { data } = response

      const creditId = localStorage.getItem("creditId")

      if (data.status === "success") {
        const submitObj = {
          creditId,
          incomeAccountType: bankInfo.incomeaccounttype,
          incomeBankType: bankInfo.incomebanktype,
          commercialBankName: bankList.filter(
            (bank) => bank.id === bankInfo.bankname
          )[0].desc,
          commercialBankAccountNumber: bankInfo.accountnumber
        }

        const submitResponse = await axios.post(
          `${apiEndpoint}/application/info/bank`,
          submitObj,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (submitResponse.data.status === "success") {
          setLoading(false)
          setPage("refInfo")
          setBankdone(true)
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

    // submitBankInfo(bankInfo)
    //   .then((res) => {
    //     successToast(res.data)
    //     setLoading(false)

    //   })
    //   .catch(() => {})
  }

  // function bankSelectHandler(e) {
  //   console.log(e.target.value)
  // }

  if (loadingBanks) {
    return (
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <CreditForm
        formDetails={[
          {
            label: "Income Account Type",
            type: "select",
            options: [
              "Select",
              "Salary Account",
              "Business Account",
              "Personal Savings Account"
            ],
            value: bankInfo.incomeaccounttype,
            name: "incomeaccounttype",
            handleChange: handleChange
          },
          {
            label: "Income Bank Type",
            type: "select",
            options: ["Select", "Commercial Bank", "Microfinance Bank"],
            value: bankInfo.incomebanktype,
            name: "incomebanktype",
            handleChange: handleChange
          }
        ]}
        formDetails2={
          bankInfo.incomebanktype === "Commercial Bank" && [
            {
              label: "Bank Name",
              type: "select",
              options: bankList,
              extraOptions: true,
              value: bankInfo.bankname,
              name: "bankname",
              handleChange: handleChange
            },
            {
              label: "Account Number",
              type: "number",
              value: bankInfo.accountnumber,
              name: "accountnumber",
              handleChange: handleChange
            }
          ]
        }
        formDetails3={
          bankInfo.incomebanktype === "Microfinance Bank" && [
            {
              label: "Microfinace Bank Name",
              type: "text",
              value: bankInfo.bankname,
              name: "bankname",
              handleChange: handleChange
            },
            {
              label: "Account Number",
              type: "number",
              value: bankInfo.accountnumber,
              name: "accountnumber",
              handleChange: handleChange
            }
          ]
        }
        formDetails4={
          bankInfo.incomebanktype === "Microfinance Bank" && [
            {
              label: "Bank Name",
              type: "select",
              options: bankList,
              extraOptions: true,
              value: bankInfo.bankname,
              name: "bankname",
              handleChange: handleChange
            },
            {
              label: "Account Number",
              type: "number",
              value: bankInfo.accountnumber,
              name: "accountnumber",
              handleChange: handleChange
            }
          ]
        }
        handleSubmit={checkDone() ? startPayment : handleSubmit}
        buttonText={checkDone() ? "Pay Verification Fee" : "Continue"}
        loading={loading}
      />
    </div>
  )
}

export default BankInformation
