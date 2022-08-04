import axios from "axios";
import { API_BASE_URL } from "../../constants/";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 20000,
});

export default instance;