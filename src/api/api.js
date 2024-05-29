

import axios from "axios";

const baseURL = "http://192.168.1.41:8891/api/ats/157industries";

export const getPasswordFromDB = (id) =>
  axios.post(`${baseURL}/fetch-pass/${id}`);

  export const getEmployeeWorkData = (id) =>
axios.get(`${baseURL}/employee-work/${id}`);

  export default axios;

