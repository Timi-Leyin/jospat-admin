import axios from "axios"

const  axiosInstance = axios.create({
    baseURL:"https://jospat-api.onrender.com",
    // headers:{
    //     Authorization:`Bearer ${typeof window != "undefined" &&window.sessionStorage.getItem("sid")}`
    // }
})

export default axiosInstance