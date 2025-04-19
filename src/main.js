import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'  // 新增Element Plus导入
import 'element-plus/dist/index.css'    // 新增Element Plus样式

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)  // 新增Element Plus插件注册

app.mount('#app')
