import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "/", // Replace with your API base URL if needed
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance

