import { useToasts } from 'react-toast-notifications';
import http from './httpService';

// const apiEndpoint = 'http://localhost:2000/user';
const apiEndpoint = 'https://cryptic-reef-51266.herokuapp.com/user';

export async function inititiateCredit(creditInfo) {
  return await http.post(`${apiEndpoint}/initiate-credit`, creditInfo, );
}

export async function getLoanStat(loanid) {
  return await http.post(`${apiEndpoint}/get-loan-status`, { loanid });
}

export async function submitPersonalInfo(personalInfo) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.post(`${apiEndpoint}/save-personal-information`, personalInfo, config);
}

export async function submitContactInfo(contactInfo) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId'),

    }
  }
  return await http.post(`${apiEndpoint}/save-contact-information`, contactInfo, config);
}

export async function submitEmploymentInfo(employmentInfo) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.post(`${apiEndpoint}/save-employment-information`, employmentInfo, config);
}

export async function submitBankInfo(bankInfo) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.post(`${apiEndpoint}/save-bank-information`, bankInfo, config);
}

export async function submitReferenceInfo(referenceInfo) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.post(`${apiEndpoint}/save-referee-information`, referenceInfo, config);
}

export async function makeFeePayment(id) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.post(`${apiEndpoint}/make-fee-payment`, id);
}

export async function verifyFeePayment(data) {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.post(`${apiEndpoint}/verify-fee-payment`, data);
}

export async function getLoanDetails() {
  let config = {
    headers: {
      loanid: localStorage.getItem('loanId')
    }
  }
  return await http.get(`${apiEndpoint}/get-loan-details`);
}

export async function getDocumentDetails(loanid) {
  let config = {
    headers: {
      loanid: loanid
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

export function SuccessToast(msg) {
  // const { addToast } = useToasts();
  // addToast(msg, { appearance: "success" });
}

export default {
  makeFeePayment,
  getLoanDetails,
  submitPersonalInfo,
  submitContactInfo,
  submitEmploymentInfo,
  submitBankInfo,
  getLoanStat,
  submitReferenceInfo,
  SuccessToast
};
