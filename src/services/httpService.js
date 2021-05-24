  
import axios from 'axios';
import { toast } from 'react-toastify';


// Add a request interceptor
axios.interceptors.request.use(function (config) {

  const user = JSON.parse(localStorage.getItem('userObjFromBckEnd'));
  config.headers['Content-Type'] = 'application/json';
  if (!user)
    return config;

  config.headers['authid'] = user.authid;
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
    toast.error('An unexpected error occurrred.');
  } else if (expectedError && !error.response.data) {
    toast.error('An unexpected error occurrred.');
  } else {
    toast.error(error.response.data);
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Content-Type"] = 'application/json';
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
