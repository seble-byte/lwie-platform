// ./axiosinstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API, // Ensure this is set correctly
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;