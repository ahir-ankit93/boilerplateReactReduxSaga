import axios from "axios";
import { BASE_URL, REST_AUTH_BASE_URL } from "./constants";

export const request = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const restAuthRequest = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

function getToken() {
  return localStorage.getItem("BrandName_auth_token");
}

export function setupHttpConfig() {
  request.defaults.baseURL = BASE_URL;
  request.defaults.timeout = 5000;
  // request.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     const errResponse = error.response;
  //     if (errResponse && errResponse.status === 401) {
  //       localStorage.clear();
  //       window.location.reload();
  //       return;
  //     }
  //   return Promise.reject(error);
  // }
  // );

  restAuthRequest.defaults.baseURL = REST_AUTH_BASE_URL;
  restAuthRequest.defaults.timeout = 5000;
  const token = getToken();
  if (token) {
    request.defaults.headers.Authorization = `Token ${token}`;
  }
}

export function convertToFormData(payload) {
  const formData = new FormData();
  const items = Object.keys(payload);
  items.forEach((key) => {
    formData.append(key, payload[key]);
  });
  return formData;
}
