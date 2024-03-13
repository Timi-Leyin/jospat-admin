import axios from "axios"

const  axiosInstance = axios.create({
    baseURL:"http://localhost:5000",
    // headers:{
    //     Authorization:`Bearer ${typeof window != "undefined" &&window.sessionStorage.getItem("sid")}`
    // }
})

export default axiosInstance