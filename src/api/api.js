

import axios from "axios";

const baseURL = "http://192.168.1.40:8891/api/ats/157industries";

export const getPasswordFromDB = (id) =>
  axios.post(`${baseURL}/fe
tch-pass/${id}`);

  export const getEmployeeWorkData = (id) =>
axios.get(`${baseURL}/employee-work/${id}`);

  export default axios;

