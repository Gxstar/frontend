<template>
  <div class="home-view">
    <h1>Welcome to HomeView</h1>
    <div v-if="authStore.isLoggedIn">
      <p>用户名: {{ authStore.userInfo?.username }}</p>
      <p>邮箱: {{ authStore.userInfo?.email }}</p>
    </div>
    <div v-else>
      <p>没有登录</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
console.log(authStore)
</script>