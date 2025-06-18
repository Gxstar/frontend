import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'  // 新增Element Plus导入
import 'element-plus/dist/index.css'    // 新增Element Plus样式
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import api from './api'

const app = createApp(App)

app.config.globalProperties.$api = api

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})  // 新增Element Plus插件注册并设置中文语言包

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
