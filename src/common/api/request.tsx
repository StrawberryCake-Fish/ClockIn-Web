import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:10010',
    timeout: 5000,
})

// 请求拦截
instance.interceptors.request.use(
    (config) => {
        config.headers = {
            "Content-Type": "application/json",
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// 响应拦截
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export { instance }
