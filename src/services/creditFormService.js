import { toast } from 'react-toastify';
import http from './httpService';

const apiEndpoint = 'http://localhost:2000/user';

export async function makeFeePayment(id) {
  return await http.post(`${apiEndpoint}/make-fee-payment`, id);
}

export async function getLoanDetails() {
  return await http.get(`${apiEndpoint}/get-loan-details`);
}

export default {
  makeFeePayment,
  getLoanDetails
};
