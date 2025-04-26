<template>
    <div class="container">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
                {{ item.meta.title || item.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <HomeView v-if="$route.path === '/admin'" />
        <router-view v-else />
    </div>
</template>

<script setup>
import HomeView from '@/views/admin/HomeView.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const $route = useRoute()

const breadcrumbs = computed(() => {
    const matched = $route.matched.filter(item => item.meta?.title || item.name)
    return matched.map(item => ({
        ...item,
        meta: {
            ...item.meta,
            title: {
                '/admin': '首页',
                '/admin/brand': '品牌管理',
                '/admin/camera': '相机信息',
                '/admin/lens': '镜头信息',
                '/admin/mount': '卡口管理',
                '/admin/user': '用户管理',
                '/admin/settings': '系统设置'
            }[item.path] || item.meta?.title || item.name
        }
    }))
})
</script>

<style scoped>
.container {
    padding: 20px;
    min-height: calc(100vh - 61px);
    background-color: #f5f7fa;
    /* 页面背景色 */
}

.breadcrumb {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    /* 卡片阴影 */
}
</style>