// import axiosInstance from "@/shared/utils/axios_instance";

import axiosInstance from "./axiosinstance";
const fetch = (url: string) => axiosInstance.get(url).then((res) => res.data);

export default fetch;