<template>
  <div class="admin-container">
    <Sidebar />
    <div class="main-content">
      <!-- 管理首页内容 -->
      <h1>欢迎来到管理首页</h1>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/admin/Sidebar.vue'
// 组合式API逻辑
</script>

<style scoped>
/* 样式 */
.admin-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>