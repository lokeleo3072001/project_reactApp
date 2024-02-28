import Axios from "axios";
import publicIP from "../ip/publicIP";

const axiosInstance = Axios.create({
    timeout: 3 * 60 * 1000,
    baseURL: publicIP.publicIp,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export const sendGet = (url, params) =>
    axiosInstance.get(url, { params }).then((res) => res.data);

export const sendPost = (url, params, queryParams) =>
    axiosInstance
        .post(url, params, { params: queryParams })
        .then((res) => res.data);
        
export const sendDelete = (url, params) =>
    axiosInstance.delete(url, { params }).then((res) => res.data);
