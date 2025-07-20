<template>
  <div class="sidebar">
    <!-- 侧边栏内容 -->
    <ul>
      <li><a href="#">管理首页</a></li>
      <li><a href="#">用户管理</a></li>
      <li><a href="#">品牌管理</a></li>
      <li><a href="#">相机管理</a></li>
      <li><a href="#">镜头管理</a></li>
      <li><a href="#">卡口管理</a></li>
    </ul>
  </div>
</template>

<script setup>
// 组合式API逻辑
</script>

<style scoped>
/* 样式 */
.sidebar {
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
}
</style>