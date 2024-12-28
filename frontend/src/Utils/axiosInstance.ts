import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Clear any default headers that might be causing issues
delete axiosInstance.defaults.headers.common["Content-Type"];
delete axiosInstance.defaults.headers.post["Content-Type"];

// Add an interceptor to log the actual request being sent
axiosInstance.interceptors.request.use((request) => {
  console.log("Request being sent:", {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data,
  });
  return request;
});

export default axiosInstance;
