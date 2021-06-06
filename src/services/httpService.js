  
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';


// Add a request interceptor
axios.interceptors.request.use(function (config) {

  config.headers['Content-Type'] = 'application/json';

  config.headers['authid'] = JSON.parse(localStorage.getItem('userObjFromBckEnd')).authid;
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

    console.log(error.response);

  if (!expectedError && !error.response.data) {
    ErrorToast('An unexpected error occurrred.');
  } else if (expectedError && !error.response.data) {
    ErrorToast('An unexpected error occurrred.');
  } else {
    ErrorToast(error.response.data);
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Content-Type"] = 'application/json';
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export function ErrorToast(msg) {
  const { addToast } = useToasts();
  addToast(msg, { appearance: 'error' });
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
