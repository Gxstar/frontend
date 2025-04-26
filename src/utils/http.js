import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const axiosInstance = axios.create();

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;