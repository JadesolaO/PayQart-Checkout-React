import { toast } from "react-toastify"
import http from "./httpService"

// const isDevelopment = () => process.env.NODE_ENV !== "production"

const apiEndpoint = "https://cryptic-reef-51266.herokuapp.com/user"

export async function inititiateCredit(creditInfo) {
  return await http.post(`${apiEndpoint}/initiate-credit`, creditInfo)
}

export async function getLoanStat(loanid) {
  return await http.post(`${apiEndpoint}/get-loan-status`, { loanid })
}

export async function submitPersonalInfo(personalInfo) {
  const response = await http.post(
    `${apiEndpoint}/save-personal-information`,
    personalInfo
  )

  console.log(response)
  return response
}

export async function submitContactInfo(contactInfo) {
  return await http.post(`${apiEndpoint}/save-contact-information`, contactInfo)
}

export async function submitEmploymentInfo(employmentInfo) {
  return await http.post(
    `${apiEndpoint}/save-employment-information`,
    employmentInfo
  )
}

export async function submitBankInfo(bankInfo) {
  return await http.post(`${apiEndpoint}/save-bank-information`, bankInfo)
}

export async function submitReferenceInfo(referenceInfo) {
  let config = {
    headers: {
      loanid: localStorage.getItem("loanId")
    }
  }
  return await http.post(
    `${apiEndpoint}/save-referee-information`,
    referenceInfo,
    config
  )
}

export async function makeFeePayment(obj) {
  return await http.post(`${apiEndpoint}/make-fee-payment`, obj)
}

export async function verifyFeePayment(data) {
  return await http.post(`${apiEndpoint}/verify-fee-payment`, data)
}

export async function getLoanDetails() {
  let config = {
    headers: {
      loanid: localStorage.getItem("loanId")
    }
  }
  return await http.get(`${apiEndpoint}/get-loan-details`, config)
}

export async function getDocumentDetails() {
  let config = {
    headers: {
      loanid: localStorage.getItem("loanId")
    }
  }
  return await http.get(`${apiEndpoint}/check-document-status`, config)
}

export async function uploadDocument(data) {
  let config = {
    headers: {
      loanid: localStorage.getItem("loanId")
    }
  }
  return await http.post(`${apiEndpoint}/upload-document`, data, config)
}

export function successToast(msg) {
  console.log(msg)
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}
