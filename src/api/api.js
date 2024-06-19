import axios from "axios";

//My New Changes 7:10
const API_BASE_URL = "http://192.168.1.33:8891/api/ats/157industries";

export const getPasswordFromDB = (id) =>
  axios.post(`${API_BASE_URL}/fetch-pass/${id}`);

export const getEmployeeWorkData = (id) =>
  axios.get(`${API_BASE_URL}/employee-work/${id}`);

export const fetchMasterSheetData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all-master-sheet`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchResumeFile = async (fileUrl) => {
  try {
    const response = await axios.get(fileUrl, { responseType: "blob" });
    const file = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return URL.createObjectURL(file);
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};

export const fetchEmployeeMasterSheet = async (employeeId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/employee-master-sheet/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employee master sheet:", error);
    throw error;
  }
};

export const fetchFile = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "blob" });
    return response.data;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};


export default axios;
