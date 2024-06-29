import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://us-central1-jospat-ng.cloudfunctions.net/api/v1",
  baseURL: "https://jospat.koyeb.app/v1",
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${typeof window != "undefined" ? window.sessionStorage.getItem("authenticated") : "none"}`,
  },
});

export default axiosInstance;

