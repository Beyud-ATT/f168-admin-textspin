import axios from "axios";
import { logoutHelper } from "../utils/helper";

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (error.response.data.error === -3) {
        logoutHelper();
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosBase;
