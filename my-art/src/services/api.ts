import axios from "axios";

const api = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(
      `Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error.message);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Response error:",
      error.response?.status ?? "network error",
      error.message
    );
    return Promise.reject(error);
  }
);

export default api;