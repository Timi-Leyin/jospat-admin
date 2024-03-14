import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Beaer ${typeof window != "undefined" ? window.sessionStorage.getItem("authenticated") : "none"}`,
  },
});

export default axiosInstance;
