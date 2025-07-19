import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OpenAPI } from './services/api/core/OpenAPI';
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

// 在开发环境下使用代理路径，在生产环境下使用实际的后端地址

OpenAPI.BASE = 'http://127.0.0.1:8000'; // 替换为你的生产后端地址


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
