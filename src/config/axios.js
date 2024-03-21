import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jospat-ng.cyclic.app/v1",
  headers: {
    Authorization: `Bearer ${typeof window != "undefined" ? window.sessionStorage.getItem("authenticated") : "none"}`,
  },
});

export default axiosInstance;
