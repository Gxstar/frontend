import axios from "axios";
import { useAuthStore } from '@/stores/auth';

// 设置超时时间(5秒)
axios.defaults.timeout = 5000;

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 添加请求时间戳
    config.headers['X-Request-Time'] = Date.now().toString();
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // 处理token过期
    if (error.response && error.response.status === 401) {
        console.error('认证失败，token可能已过期');
        const authStore = useAuthStore();
        authStore.logout();
        // 可以在这里添加跳转到登录页的逻辑
        // window.location.href = '/login';
    }
    
    // 处理请求超时
    if (error.code === 'ECONNABORTED') {
        console.error('请求超时，请检查网络连接');
    }
    
    // 处理其他错误
    console.error('请求错误:', error);
    return Promise.reject(error);
});