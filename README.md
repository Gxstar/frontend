# 相机数据管理系统前端

本项目为相机数据管理系统的前端部分，基于 Vue3 + Element Plus + Pinia + Axios + Vite 构建，后端接口由 FastAPI 提供。

## 技术栈
- [Vue 3](https://vuejs.org/) (组合式 API)
- [Element Plus](https://element-plus.org/zh-CN/)
- [Pinia](https://pinia.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)

## 目录结构
```
frontend/
├── public/                # 静态资源
├── src/
│   ├── assets/            # 静态资源（样式、图片）
│   ├── components/        # 公共组件
│   ├── views/             # 页面视图
│   │   └── admin/         # 管理后台各功能页面
│   ├── stores/            # Pinia 状态管理
│   ├── router/            # 路由配置
│   ├── utils/             # 工具函数（如 http 封装）
│   ├── config.js          # API 配置
│   ├── main.js            # 入口文件
│   └── App.vue            # 根组件
├── package.json           # 项目依赖
├── vite.config.js         # Vite 配置
└── README.md              # 项目说明
```

## 安装与启动

### 1. 安装依赖
建议使用 [pnpm](https://pnpm.io/)（也可用 npm/yarn）：
```bash
pnpm install
```

### 2. 启动开发服务器
```bash
pnpm dev
```

### 3. 打包构建
```bash
pnpm build
```

### 4. 预览打包结果
```bash
pnpm preview
```

## 常用命令
| 命令           | 说明         |
| -------------- | ------------ |
| pnpm install   | 安装依赖     |
| pnpm dev       | 本地开发     |
| pnpm build     | 生产环境打包 |
| pnpm preview   | 本地预览打包 |

## 主要功能模块
- 用户注册、登录、权限管理
- 品牌、相机、镜头、卡口、用户、系统设置等后台管理
- 支持分页、搜索、批量操作、弹窗编辑等
- 响应式布局与美观的 UI 设计

## 代码规范与建议
- 推荐使用组合式 API
- 状态管理统一用 Pinia
- 网络请求统一用 Axios 并做拦截处理
- 路由管理用 Vue Router
- 页面样式美观，支持响应式

## 相关链接
- [Element Plus 中文文档](https://element-plus.org/zh-CN/)
- [Pinia 中文文档](https://pinia.vuejs.org/zh/)
- [Vite 官方文档](https://cn.vitejs.dev/)

## 贡献与反馈
如有建议或问题，欢迎提 issue 或 PR。
