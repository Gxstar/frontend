<template>
    <div class="container">
        <HomeView v-if="$route.path === '/admin'" />
        <router-view v-else />
    </div>
</template>

<script setup>
import HomeView from '@/views/admin/HomeView.vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
</script>

<style scoped>
.container {
    padding: 20px;
    background-color: #f5f7fa;
    /* 页面背景色 */
}
</style>