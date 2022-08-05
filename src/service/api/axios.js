import axios from "axios";
import { API_BASE_URL } from "../../constants/";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 20000,
  validateStatus: function (status) {
    return status >= 200 && status < 504; 
  }
});

export default instance;