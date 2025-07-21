import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OpenAPI } from './services/api/core/OpenAPI';
import './services/api/interceptors';
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './assets/main.css'


// 设置基础地址

OpenAPI.BASE = 'http://127.0.0.1:8000'; 


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{
    locale: zhCn
})

app.mount('#app')
