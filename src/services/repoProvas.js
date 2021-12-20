import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

function getTests() {
  return axios.get(`${URL}/test-form`);
}

function getTestsParams() {
  return axios.get(`${URL}/test-creation`);
}

function postTestsParams(params) {
  return axios.post(`${URL}/test-creation`, params);
}

export { getTests, getTestsParams, postTestsParams };
