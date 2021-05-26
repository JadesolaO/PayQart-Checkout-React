import { toast } from 'react-toastify';
import http from './httpService';

// const apiEndpoint = 'http://localhost:2000/user';
const apiEndpoint = 'https://cryptic-reef-51266.herokuapp.com/user';

export async function inititiateCredit(creditInfo) {
  return await http.post(`${apiEndpoint}/initiate-credit`, creditInfo, );
}

export async function submitPersonalInfo(personalInfo) {
  return await http.post(`${apiEndpoint}/save-personal-information`, personalInfo);
}

export async function submitContactInfo(contactInfo) {
  return await http.post(`${apiEndpoint}/save-contact-information`, contactInfo);
}

export async function submitEmploymentInfo(employmentInfo) {
  return await http.post(`${apiEndpoint}/save-employment-information`, employmentInfo);
}

export async function submitBankInfo(bankInfo) {
  return await http.post(`${apiEndpoint}/save-bank-information`, bankInfo);
}

export async function submitReferenceInfo(referenceInfo) {
  return await http.post(`${apiEndpoint}/save-referee-information`, referenceInfo);
}

export async function makeFeePayment(id) {
  return await http.post(`${apiEndpoint}/make-fee-payment`, id);
}

export async function getLoanDetails() {
  return await http.get(`${apiEndpoint}/get-loan-details`);
}

export async function getDocumentDetails() {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.get(`${apiEndpoint}/check-document-status`, config);
}

export async function uploadDocument(data) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.post(`${apiEndpoint}/upload-document`, data, config);
}

export function successToast(msg) {
  console.log(msg);
  toast.success(msg);
}

export default {
  makeFeePayment,
  getLoanDetails,
  submitPersonalInfo,
  submitContactInfo,
  submitEmploymentInfo,
  submitBankInfo,
  submitReferenceInfo,
  successToast
};
