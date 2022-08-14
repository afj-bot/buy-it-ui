import axios from "axios"
import { API_BASE_URL, LANGUAGE_ATTRIBUTE, OK, SERVER_ERROR } from "../../constants/"

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": localStorage.getItem(LANGUAGE_ATTRIBUTE) !== null ? localStorage.getItem(LANGUAGE_ATTRIBUTE) : "en"
  },
  withCredentials: true,
  timeout: 20000,
  validateStatus: function (status) {
    return status >= OK && status < SERVER_ERROR
  }
})

export default instance
