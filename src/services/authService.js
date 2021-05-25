import { toast } from 'react-toastify';
import http from './httpService';

const apiEndpoint = 'http://localhost:2000/user';
// const apiEndpoint = 'https://cryptic-reef-51266.herokuapp.com/user';

export async function doLogin(user) {
  return await http.post(`${apiEndpoint}/login`, user);
}

export async function doPasswordReset(email) {
  return await http.post(`${apiEndpoint}/reset-pin`, email);
}

export async function doSignUp(user) {
  return await http.post(`${apiEndpoint}/signUp`, user);
}

export function successToast(msg) {
  console.log(msg);
  toast.success(msg);
}

export default {
  doLogin,
  doPasswordReset,
  doSignUp
};
