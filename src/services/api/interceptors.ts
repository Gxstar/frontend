import axios from "axios";

//添加请求拦截器
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('请求拦截器', config);
    return config;
});

//添加响应拦截器
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});