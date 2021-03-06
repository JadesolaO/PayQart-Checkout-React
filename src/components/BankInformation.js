import React, { useState, useEffect, useCallback } from "react"
import CreditForm from "./CreditForm"

import "../stylesheets/css/creditapplicationscreen.css"

import axios from "axios"
import apiEndpoint from "../utils/apiEndpoint"
import { useHistory } from "react-router-dom"

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

  const [error, updateError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  let history = useHistory()

  const orderId = localStorage.getItem("orderId")

  const getBanks = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/utilities/getBanks`)

      const { data } = response

      if (data.status === "success") {
        const responseData = data.data.map((bank) => {
          return { id: bank.code, desc: bank.name }
        })

        updateLoadingBanks(false)
        setBankList(responseData)

        const bankInfoObj = JSON.parse(localStorage.getItem("bankInfoObj"))

        if (bankInfoObj !== null) {
          const {
            incomeAccountType,
            incomeBankType,
            commercialBankName,
            commercialBankAccountNumber
          } = bankInfoObj

          setBankInfo({
            incomebanktype: incomeBankType,
            incomeaccounttype: incomeAccountType,
            bankname: responseData.filter(
              (bank) => bank.desc === commercialBankName
            )[0].id,
            accountnumber: commercialBankAccountNumber
          })

          setBankdone(true)
        }
      }
    } catch (error) {
      console.log(error.response)
      updateLoadingBanks(false)
    }
  }, [setBankdone])
  useEffect(() => {
    getBanks()
  }, [getBanks])

  const handleChange = (name, e) => {
    console.log(name, e.target.value)
    setBankInfo({ ...bankInfo, [name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    updateError(false)
    setErrorMsg("")

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
          history.push(`/${orderId}/creditapplication/referee`)
          localStorage.setItem("bankInfoObj", JSON.stringify(submitObj))
          setBankdone(true)
        }
      }
    } catch (error) {
      setLoading(false)
      if (
        error.response.data.message === "Account Number Or Bank Code Invalid"
      ) {
        updateError(true)
        setErrorMsg("Invalid account number")
      }
      if (
        error.response.data.message ===
        "Authorization Failed, please login to continue"
      ) {
        history.push("/signin/1")
      }
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
      {error && (
        <div className="px-4 position-absolute">
          <p style={{ color: "red" }}>* {errorMsg}</p>
        </div>
      )}
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
