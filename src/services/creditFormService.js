import { toast } from 'react-toastify';
import http from './httpService';

const apiEndpoint = 'http://localhost:2000/user';

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
