import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jospat-api-1.onrender.com/v1",
  headers: {
    Accept:"*/*",
    Authorization: `Bearer ${typeof window != "undefined" ? window.sessionStorage.getItem("authenticated") : "none"}`,
  },
});

export default axiosInstance;

