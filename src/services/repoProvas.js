import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

function setConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getTests() {
  return axios.get(`${URL}/test-form`);
}

export { getTests };
