import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1",
  headers: {
    Authorization: `Bearer ${typeof window != "undefined" ? window.sessionStorage.getItem("authenticated") : "none"}`,
  },
});

export default axiosInstance;
